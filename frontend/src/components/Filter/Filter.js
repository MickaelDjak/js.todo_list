import React, { Component } from "react";
import "./Filter.css";

export default class Filter extends Component {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" }
  ];

  render() {
    const buttonList = this.buttons.map(({ name, label }) => {
      const active = name === this.props.filter ? "active" : "";

      return (
        <button 
        key={name} 
        className={"btn btn-outline-info " + active}
        onClick={()=>{this.props.setFilter(name)}}
        >
          {label}
        </button>
      );
    });

    return (
      <div className="Filter">
        <div className="btn-group">{buttonList}</div>
      </div>
    );
  }
}
