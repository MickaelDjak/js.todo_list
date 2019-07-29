import React, { Component } from "react";
import TodoListItem from "./../TodoListItem";
import "./TodoList.css";

export default class TodoList extends Component {
  render() {
    const {
      todoList,
      toggleDoneMarker,
      toggleImpontentMarker,
      toggleEditMarker,
      dropTask,
      editTask
    } = this.props;

    return (
      <div className="TodoList ">
        <div className="list-group">
          {todoList.length ? (
            todoList.map(el => (
              <TodoListItem
                key={el.id}
                {...el}
                toggleDoneMarker={toggleDoneMarker}
                toggleImpontentMarker={toggleImpontentMarker}
                toggleEditMarker={toggleEditMarker}
                dropTask={dropTask}
                editTask={editTask}
              />
            ))
          ) : (
            <p>There is no one task</p>
          )}
        </div>
      </div>
    );
  }
}
