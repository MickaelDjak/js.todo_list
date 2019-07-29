import React, { Component } from "react";
import "./SearchPanel.css";

export default class SearchPanel extends Component {
  state = {
    query: ""
  };

  setQuery = event => {
    const query =event.target.value  ;
    this.props.setQuery(query);
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <div className="SearchPanel input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search task"
          value={this.state.query}
          onChange={this.setQuery}
        />
      </div>
    );
  }
}
