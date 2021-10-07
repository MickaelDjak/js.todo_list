import React, { Component } from "react";
import Header from "./../Header";
import Counter from "./../Counter";
import SearchPanel from "./../SearchPanel";
import Filter from "./../Filter";
import AddPanel from "./../AddPanel";
import TodoList from "./../TodoList";
import "./App.css";

export default class App extends Component {
  id = 10;

  constructor() {
    super();

    this.state = {
      todoList: [
        this.createTask("Drink coffee"),
        this.createTask("Make my first react app"),
        this.createTask("Go to sleap")
      ],
      query: "",
      filter: "all" // {all, done, active}
    };
  }

  createTask = text => {
    return {
      id: this.id++,
      text: text,
      impontent: false,
      done: false,
      edit: false
    };
  };

  toggleImpontentMarker = id => {
    const idx = this.state.todoList.findIndex(el => el.id === id);
    const previousTask = this.state.todoList[idx];

    this.setState(({ todoList }) => {
      return {
        todoList: [
          ...todoList.slice(0, idx),
          { ...previousTask, impontent: !previousTask.impontent },
          ...todoList.slice(idx + 1)
        ]
      };
    });
  };

  toggleEditMarker = id => {
    const idx = this.state.todoList.findIndex(el => el.id === id);
    const previousTask = this.state.todoList[idx];

    this.setState(({ todoList }) => {
      return {
        todoList: [
          ...todoList.slice(0, idx),
          { ...previousTask, edit: !previousTask.edit },
          ...todoList.slice(idx + 1)
        ]
      };
    });
  };

  toggleDoneMarker = id => {
    const idx = this.state.todoList.findIndex(el => el.id === id);
    const previousTask = this.state.todoList[idx];
    this.setState(({ todoList }) => {
      return {
        todoList: [
          ...todoList.slice(0, idx),
          { ...previousTask, done: !previousTask.done },
          ...todoList.slice(idx + 1)
        ]
      };
    });
  };

  addTask = text => {
    this.setState(({ todoList }) => {
      return {
        todoList: [...todoList, this.createTask(text)]
      };
    });
  };

  editTask = (id, text) => {
    const { todoList } = this.state;

    const idx = todoList.findIndex(el => el.id === id);
    const previousTask = todoList[idx];
    this.setState({
      todoList: [
        ...todoList.slice(0, idx),
        { ...previousTask, text: text },
        ...todoList.slice(idx + 1)
      ]
    });
  };

  dropTask = id => {
    const idx = this.state.todoList.findIndex(el => el.id === id);
    this.setState(({ todoList }) => {
      return {
        todoList: [...todoList.slice(0, idx), ...todoList.slice(idx + 1)]
      };
    });
  };

  setQuery = query => {
    this.setState({ query });
  };

  searchExecute = (todoList, query) => {
    return todoList.filter(el => {
      return el.text.toUpperCase().search(query.toUpperCase()) !== -1;
    });
  };

  setFilter = filter => {
    this.setState({ filter });
  };

  filterExecute = (todoList, filter) => {
    switch (filter) {
      case "active":
        return todoList.filter(el => !el.done);

      case "done":
        return todoList.filter(el => el.done);

      case "all":
      default:
        return todoList;
    }
  };

  render() {
    const { todoList, query, filter } = this.state;
    const showedList = this.filterExecute(
      this.searchExecute(todoList, query),
      filter
    );
    return (
      <div className="App container">
        <div className="row justify-content-center ">
          <div className="col-6 App-header">
            <Header />
            <Counter todoList={showedList} />
          </div>
        </div>

        <div className="row justify-content-center ">
          <div className="col-6  App-navigation">
            <SearchPanel setQuery={this.setQuery} />
            <Filter setFilter={this.setFilter} filter={filter} />
          </div>
        </div>

        <div className="row justify-content-center ">
          <div className="col-6">
            <AddPanel addTask={this.addTask} />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-6">
            <TodoList
              todoList={showedList}
              toggleDoneMarker={this.toggleDoneMarker}
              toggleImpontentMarker={this.toggleImpontentMarker}
              toggleEditMarker={this.toggleEditMarker}
              dropTask={this.dropTask}
              editTask={this.editTask}
            />
          </div>
        </div>
      </div>
    );
  }
}
