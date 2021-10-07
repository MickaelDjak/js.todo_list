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
    event.preventDefault();
    this.props.addTask(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <form className="AddPanel input-group" onSubmit={this.addTask}>
        <input
          type="text"
          className="form-control"
          placeholder="Add new task"
          value={this.state.value}
          onChange={this.inputNewTask}
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-outline-success">
            Add
          </button>
        </div>
      </form>
    );
  }
}
