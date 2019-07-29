import React, { Component } from "react";
import "./AddPanel.css";

export default class AddPanel extends Component {
  state = {
    value: ""
  };

  inputNewTask = event => {
    this.setState({ value: event.target.value });
  };

  addTask = event => {
    this.props.addTask(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <div className="AddPanel input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add new task"
          value={this.state.value}
          onChange={this.inputNewTask}
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={this.addTask}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}
