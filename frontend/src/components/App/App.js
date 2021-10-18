import React, { Component } from "react";
import Header from "./../Header";
import Counter from "./../Counter";
import SearchPanel from "./../SearchPanel";
import Filter from "./../Filter";
import AddPanel from "./../AddPanel";
import TodoList from "./../TodoList";
import "./App.css";
import {ApiService} from "../../services/apiService";
import {WebSocketService} from "../../services/webSocketService";

export default class App extends Component {
  id = 10;
  socket;

  constructor() {
    super();
    this.apiSerivce = new ApiService();
    this.webSocket = new WebSocketService();

    this.state = {
      todoList: [],
      query: "",
      filter: "all" // {all, done, active}
    };
  }

  async componentDidMount() {
    await this.fetchDashboard();
    this.webSocketRegistration();
  }

  webSocketRegistration(){
    this.webSocket.listenOn("DashboardCreatedEvent", (event) => {
      this.setState({
        ...this.state,
        todoList: [...this.state.todoList, this.mapDashboard(event.id, event.name)]
      })
    });

    this.webSocket.listenOn("DashboardRenamedEvent", (event) => {
      const { todoList } = this.state;
      const idx = todoList.findIndex(el => el.id === event.id);
      const previousTask = todoList[idx];
      this.setState({
        todoList: [
          ...todoList.slice(0, idx),
          { ...previousTask, text: event.name },
          ...todoList.slice(idx + 1)
        ]
      });
    });

    this.webSocket.listenOn("DashboardArchivedEvent", (event) => {
      console.log(event);
      const idx = this.state.todoList.findIndex(el => el.id === event.id);
      if(idx === -1) {
        return
      }
      this.setState(({ todoList }) => {
        return {
          todoList: [...todoList.slice(0, idx), ...todoList.slice(idx + 1)]
        };
      });
    });
  }

  async fetchDashboard(){
    const dashboards = await this.apiSerivce.getDashboard();
    const todoList = dashboards.map(item => {
      return this.mapDashboard(item._id, item.name);
    })
    this.setState({ ...this.state, todoList});
  }

  mapDashboard = (id, name) => {
    return {
      id,
      text: name,
      important: false,
      done: false,
      edit: false
    };
  };

  toggleImportantMarker = id => {
    const idx = this.state.todoList.findIndex(el => el.id === id);
    const previousTask = this.state.todoList[idx];

    this.setState(({ todoList }) => {
      return {
        todoList: [
          ...todoList.slice(0, idx),
          { ...previousTask, important: !previousTask.important },
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

  createDashboard = name => {
    this.webSocket.emit('dashboard/create', { name });
  };

  editDashboard = (id, name) => {
    this.webSocket.emit('dashboard/rename', { id, name });
  };

  archiveDashboard = id => {
    this.webSocket.emit('dashboard/archive', { id });
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
          <div className="col-8 App-header">
            <Header />
            <Counter todoList={showedList} />
          </div>
        </div>

        <div className="row justify-content-center ">
          <div className="col-8  App-navigation">
            <SearchPanel setQuery={this.setQuery} />
            <Filter setFilter={this.setFilter} filter={filter} />
          </div>
        </div>

        <div className="row justify-content-center ">
          <div className="col-8">
            <AddPanel addTask={this.createDashboard} />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-8">
            <TodoList
              todoList={showedList}
              toggleDoneMarker={this.toggleDoneMarker}
              toggleImportantMarker={this.toggleImportantMarker}
              toggleEditMarker={this.toggleEditMarker}
              archiveDashboard={this.archiveDashboard}
              editTask={this.editDashboard}
            />
          </div>
        </div>
      </div>
    );
  }
}
