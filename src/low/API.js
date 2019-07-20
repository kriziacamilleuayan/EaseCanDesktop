import * as tf from "@tensorflow/tfjs";
export let API = {};
API["getModel"] = new Promise((resolve, reject) => {
  let yolo = null;
  try {
    yolo = require("tfjs-yolo");
  } catch (err) {
    reject("Error compatability issues");
  }
  const MODEL_STATIC_URL = __dirname + "/output/web/tensorflowjs_model.pb";
  const WEIGHTS_STATIC_URL = __dirname + "/output/web/weights_manifest.json";

  console.log("1. API log: Getting compatability");
  if (!yolo) {
    reject("Error compatability issues");
  }
  let model = yolo.v2tiny(WEIGHTS_STATIC_URL, MODEL_STATIC_URL);
  console.log("2. API log: Loading model");
  if (model) resolve(model);
});
