import React, { Component } from "react";
import { withGlobalSettings } from "../appmanager/AppContext";
import Modal from "react-modal";
import "../review/Review.css";
const axios = require("axios");
// const Ingredients = require("../../constants/ingredients");

const Ingredients = {
  pizza: [
    "water",
    "dry yeast",
    "flour",
    "olive oil",
    "salt",
    "sugar",
    "Cornmeal",
    "Tomato sauce",
    "mozzarella cheese",
    "Feta cheese",
    "Mushrooms",
    "Parmesan cheese",
    "Bell peppers",
    "Italian pepperoncini",
    "Italian sausage",
    "basil",
    "arugula",
    "Pesto",
    "Pepperoni",
    "Onions",
    "Ham"
  ],
  doughnut: [
    "flour",
    "milk",
    "yeast",
    "vanilla",
    "egg yolks",
    "sugar",
    "salt",
    "butter"
  ],
  cake: [
    "Cooking spray",
    "sugar",
    "water",
    "butter",
    "egg yolks",
    "cake flour",
    "unsweetened cocoa",
    "egg whites",
    "salt",
    "unsalted butter"
  ]
};

const Prices = {
  pizza: 70.0,
  doughnut: 100.0,
  cake: 250.0
};

class Reviews extends Component {
  state = {
    largest: {},
    modalIsOpen: false,
    ing: [],
    quantity: 1,
    total: 0,
    price: 0,
    borderNaPula: false
  };

  componentDidMount() {
    if (typeof this.props.largest["class"] !== "undefined") {
      this.setState(
        {
          ing: Ingredients[this.props.largest.class],
          price: Prices[this.props.largest.class],
          total: Prices[this.props.largest.class]
        },
        () => {
          if (
            this.state.ing.join(" ").indexOf(this.props.allergy) >= 0 &&
            this.props.allergy.length !== 0
          ) {
            this.setState({ borderNaPula: true });
          }
        }
      );
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    if (
      JSON.stringify(nextProps.largest) !== JSON.stringify(prevState.largest) ||
      JSON.stringify(nextProps.largest) !== JSON.stringify({})
    ) {
      console.log("nextProps", nextProps.largest, prevState.largest);
      // this.getData(nextProps.largest);
      return { largest: nextProps.largest, modalIsOpen: true };
    }
    return;
  }

  handleChange(elem) {
    this.setState({
      quantity: elem.target.value
    });
  }

  handleClick(elem) {
    this.setState(
      {
        quantity: this.state.quantity + (elem.target.name === "plus" ? 1 : -1)
      },
      () => {
        this.setState({
          total: this.state.quantity * this.state.price
        });
      }
    );
  }

  handleButton(elem) {
    if (elem.target.name == "btnScan") {
      this.setState(
        {
          modalIsOpen: false
        },
        () => {
          this.setState({
            largest: {},
            ing: [],
            quantity: 1,
            total: 0,
            price: 0
          });
        }
      );
    }
  }

  closeModal = () => {
    this.props.setHasDetected(false);
    console.log("yow");
    this.props.scanAgain();
  };

  componentWillMount() {
    this.props.allergyOnChange("");
  }

  render() {
    console.log("this.state", this.state, Ingredients);
    return (
      <>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.setState({ modalIsOpen: false })}
          style={{
            ...customStyles,
            ...{ border: "15px solid red !important" }
          }}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button onClick={this.closeModal} style={customStyles.close}>
            x
          </button>
          <h2
            ref={subtitle => (this.subtitle = subtitle)}
            style={this.state.borderNaPula ? { color: "red" } : {}}
          >
            {String(this.state.largest.class).toUpperCase()}
          </h2>
          {this.state.borderNaPula ? (
            <p style={{ color: "red" }}>
              {"You are allergic to this product."}
            </p>
          ) : null}
          <p>{this.state.ing ? this.state.ing.join(", ") : ""}</p>

          <p style={{ textAlign: "center" }}>{"Php " + this.state.price}</p>

          <p style={{ textAlign: "center" }}>Quantity</p>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <button
              onClick={e => this.handleClick(e)}
              disabled={this.state.quantity == 1}
              name="minus"
            >
              -
            </button>
            <input
              type="number"
              name="quantity"
              value={this.state.quantity}
              onChange={e => this.handleChange(e)}
            />
            <button onClick={e => this.handleClick(e)} name="plus">
              +
            </button>
          </div>

          <h2 style={{ textAlign: "center" }}>Total</h2>

          <p style={{ textAlign: "center" }}>Php {this.state.total}</p>

          <div style={customStyles.btnWrapper}>
            <button
              style={customStyles.secondaryBtn}
              onClick={e => this.closeModal(e)}
              name="btnScan"
            >
              Scan Again
            </button>
            {/* <button
              style={customStyles.primaryBtn}
              onClick={e => this.handleButton(e)}
              name="btnCart"
            >
              Add to Cart
            </button> */}
          </div>

          {/* input data to map here */}
          {/* <div style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          border: "5px solid red",
          zIndex: '99999',
          ba
        }}></div> */}
        </Modal>
      </>
    );
  }
}

const customStyles = {
  content: {
    top: "50%",
    height: "-webkit-fill-available",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    border: "15px solid red !important"
  },
  close: {
    float: "right",
    backgroundColor: "transparent",
    border: "none"
  },
  btnWrapper: {
    display: "flex"
  },
  secondaryBtn: {
    display: "inline-block",
    whiteSpace: "nowrap",
    margin: "0px auto",
    backgroundColor: "transparent",
    border: "1px solid #1DBAB4",
    color: "#1DBAB4",
    padding: "1em",
    borderRadius: "3px"
  },
  primaryBtn: {
    float: "right",
    display: "inline-block",
    whiteSpace: "nowrap",
    margin: "0px auto",
    color: "#eeeeee",
    backgroundColor: "#1DBAB4",
    border: "1px solid #1DBAB4",
    padding: "1em",
    borderRadius: "3px"
  }
};

export default withGlobalSettings(Reviews);
