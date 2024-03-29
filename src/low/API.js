import yolo from "tfjs-yolo";
import * as tf from "@tensorflow/tfjs";

const API = {
  getModel: () =>
    new Promise((resolve, reject) => {
      let myYolo = yolo.v3tiny();
      if (!myYolo) reject("Error fetching model");
      resolve(myYolo);
    }),

  autoSetupCamera: () =>
    new Promise((resolve, reject) => {
      const availableConstraints = ["environment", "user"];
      const video = document.getElementById("cameraSceneView");

      let videoConstraints = {
        facingMode: availableConstraints[0]
      };
      let constraints = {
        video: videoConstraints,
        audio: false
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          video.srcObject = stream;
          resolve({
            message:
              "Successfully attached camera stream on video, video constraints - " +
              JSON.stringify(constraints),
            stream: stream,
            constraints: videoConstraints
          });
        })
        .catch(error => {
          videoConstraints = {
            facingMode: availableConstraints[1]
          };
          constraints = {
            video: videoConstraints,
            audio: false
          };
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(stream => {
              video.srcObject = stream;
              resolve({
                message:
                  "Successfully attached camera stream on video, video constraints - " +
                  JSON.stringify(constraints),
                stream: stream,
                constraints: videoConstraints
              });
            })
            .catch(error => {
              reject({ message: error.message, stream: null });
            });
        });
    }),

  startPredicting: async (model, setLargest) => {
    const webcam = document.getElementById("cameraSceneView");
    const rects = document.getElementById("cameraSceneRects");
    let colors = {};
    const default_anchors = [
      1.08,
      1.19,
      3.42,
      4.41,
      6.63,
      11.38,
      9.42,
      5.11,
      16.62,
      10.52
    ];
    const start = performance.now();

    const boxes = await model.predict(webcam, {
      scoreThreshold: 0.3
    });
    const end = performance.now();
    console.log(`Inference took ${end - start} ms`);
    console.log(`End with ${tf.memory().numTensors} tensors`);

    // draw boxes
    rects.innerHTML = "";

    const cw = webcam.clientWidth;
    const ch = webcam.clientHeight;
    const vw = webcam.videoWidth;
    const vh = webcam.videoHeight;

    const scaleW = cw / vw;
    const scaleH = ch / vh;
    let largest = {};
    boxes.forEach(box => {
      if (!(box["class"] in colors)) {
        colors[box["class"]] =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
      }

      const rect = document.createElement("div");
      rect.className = "rect";
      rect.style.position = "relative";
      rect.style.top = `${box["top"] * scaleH}px`;
      rect.style.left = `${box["left"] * scaleW}px`;
      rect.style.width = `${box["width"] * scaleW - 4}px`;
      rect.style.height = `${box["height"] * scaleH - 4}px`;
      rect.style.border = "solid";
      rect.style.borderWidth = "2px";
      rect.style.borderColor = colors[box["class"]];

      const text = document.createElement("div");
      text.className = "text";
      text.innerText = `${box["class"]}`;
      text.style.color = colors[box["class"]];

      if (
        box["class"] === "pizza" ||
        box["class"] === "donut" ||
        box["class"] === "cake" ||
        box["class"] === "hot dog"
      ) {
        rect.appendChild(text);
        rects.appendChild(rect);
        if (typeof largest["score"] === "undefined") {
          largest = box;
        } else if (
          Number(largest["score"].toFixed(2)) < Number(box["score"].toFixed(2))
        ) {
          largest = box;
        }
      }
    });
    setLargest(typeof largest["score"] === "undefined" ? {} : largest);
    return true;
  }
};

export default API;
