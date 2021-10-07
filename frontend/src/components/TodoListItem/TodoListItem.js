import React, { Component } from "react";
import "./TodoListItem.css";

export default class TodoListItem extends Component {
  setText = event => {
    const text = event.target.value;
    const { id, editTask } = this.props;

    editTask(id, text);
  };

  getText = () => {
    const { edit, id, text, impontent, done, toggleDoneMarker } = this.props;

    if (edit) {
      return (
        <input
          type="text"
          className="TodoListItem-text form-controll"
          onChange={this.setText}
          placeholder="Write down task ... "
          value={text}
        />
      );
    } else {
      if (text.length) {
        let TodoListItemMarkers = "TodoListItem-text";
        TodoListItemMarkers += impontent ? " impontent" : "";
        TodoListItemMarkers += done ? " done" : "";

        return (
          <span
            className={TodoListItemMarkers}
            onClick={() => {
              toggleDoneMarker(id);
            }}
          >
            {text}
          </span>
        );
      } else {
        return <span className="TodoListItem-text empty">Empty task text</span>;
      }
    }
  };

  getButton = () => {
    const { edit, id, toggleEditMarker } = this.props;
    if (edit) {
      return (
        <button
          type="button"
          className="btn btn-success "
          onClick={() => toggleEditMarker(id)}
        >
          <i className="fa  fa-check" />
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-warning "
          onClick={() => toggleEditMarker(id)}
        >
          <i className="fa fa-pencil" />
        </button>
      );
    }
  };

  render() {
    const { id, toggleImpontentMarker, dropTask } = this.props;

    return (
      <div className="TodoListItem list-group-item">
        {this.getText()}
        <div className="button-group">
          {this.getButton()}
          <button
            type="button"
            className="btn btn-primary exclamation"
            onClick={() => toggleImpontentMarker(id)}
          >
            <i className="fa fa-exclamation" />
          </button>
          <button
            type="button"
            className="btn btn-danger deleting"
            onClick={() => dropTask(id)}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    );
  }
}
