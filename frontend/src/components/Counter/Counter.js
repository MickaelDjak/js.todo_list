import React, { Component } from "react";
import "./Counter.css";

export default class Counter extends Component {
  render() {
    const { todoList } = this.props;
    const done = todoList.filter(el => el.done).length;
    const pending = todoList.length - done;
    return (
      <div className="Counter ">
        <span>
          Done <span className="badge badge-light">{done}</span>
        </span>
        <span>
          Pending{" "}
          <span className="badge badge-secondary">
            {pending}
          </span>
        </span>
      </div>
    );
  }
}
