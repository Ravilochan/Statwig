import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class onSuccess extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h3 className="text-warning" style={{ margin: "2em" }}>
          Thank You For Shopping
        </h3>
        <Link to="/feed">
          <button className="btn btn-warning ml-3">
            Back to List of Ideas
          </button>
        </Link>
      </div>
    );
  }
}
