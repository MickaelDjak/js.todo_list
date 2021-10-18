import React, { Component } from "react";
import "./TodoListItem.css";

export default class TodoListItem extends Component {

  constructor() {
    super();
    this.state = {
      edit: false,
      text: ''
    }
  }

  toggleEditMarker = () => {
    this.setState((prev, props) => {
      if (prev.edit) {

        if (prev.text !== props.text){
          const { id, editTask } = this.props;
          editTask(id, prev.text);
        }

        return { edit: false, text: '' };
      }

      return { edit: true, text: props.text };
    })
  };

  setText = event => {
    this.setState({ ...this.state, text: event.target.value })
  };

  getText = () => {
    const { id, text: incomeText, important, done, toggleDoneMarker } = this.props;
    const { edit, text } = this.state;

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
      if (incomeText.length) {
        let TodoListItemMarkers = "TodoListItem-text";
        TodoListItemMarkers += important ? " important" : "";
        TodoListItemMarkers += done ? " done" : "";

        return (
          <span
            className={TodoListItemMarkers}
            onClick={() => {
              toggleDoneMarker(id);
            }}
          >
            {incomeText}
          </span>
        );
      } else {
        return <span className="TodoListItem-text empty">Empty task text</span>;
      }
    }
  };

  getButton = () => {
    const { edit } = this.state;
    if (edit) {
      return (
        <button
          type="button"
          className="btn btn-success "
          onClick={() => this.toggleEditMarker()}
        >
          <i className="fa  fa-check" />
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-warning "
          onClick={() => this.toggleEditMarker()}
        >
          <i className="fa fa-pencil" />
        </button>
      );
    }
  };

  render() {
    const { id, toggleImportantMarker, archiveDashboard } = this.props;

    return (
      <div className="TodoListItem list-group-item">
        {this.getText()}
        <div className="button-group">
          {this.getButton()}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => toggleImportantMarker(id)}
          >
            <i className="fa fa-exclamation" />
          </button>
          <button
            type="button"
            className="btn btn-danger deleting"
            onClick={() => archiveDashboard(id)}
          >
            <i className="fa fa-archive" />
          </button>
        </div>
      </div>
    );
  }
}
