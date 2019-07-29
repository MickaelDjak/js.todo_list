import React, { Component } from "react";
import TodoListItem from "./../TodoListItem";
import "./TodoList.css";

export default class TodoList extends Component {
  render() {
    const {
      todoList,
      toggleDoneMarker,
      toggleImpontentMarker,
      dropTask
    } = this.props;

    return (
      <div className="TodoList ">
        <div className="list-group">
          {todoList.map(el => (
            <TodoListItem
              key={el.id}
              {...el}
              toggleDoneMarker={toggleDoneMarker}
              toggleImpontentMarker={toggleImpontentMarker}
              dropTask={dropTask}
            />
          ))}
        </div>
      </div>
    );
  }
}
