import React, { Component } from "react";
import "./TodoListItem.css";

export default class TodoListItem extends Component {
  render() {
    const {
      id,
      text,
      impontent,
      done,
      toggleDoneMarker,
      toggleImpontentMarker,
      dropTask
    } = this.props;
    let TodoListItemMarkers = "TodoListItem-text";

    TodoListItemMarkers += impontent ? " impontent" : "";
    TodoListItemMarkers += done ? " done" : "";

    return (
      <div className="TodoListItem list-group-item">
        <span
          className={TodoListItemMarkers}
          onClick={() => {
            toggleDoneMarker(id);
          }}
        >
          {text}
        </span>
        <div>
          <button
            type="button"
            className="btn btn-outline-primary exclamation"
            onClick={() => toggleImpontentMarker(id)}
          >
            <i className="fa fa-exclamation" />
          </button>
          <button
            type="button"
            className="btn btn-outline-danger deleting"
            onClick={() => dropTask(id)}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    );
  }
}
