// Library imports
import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
// Compoonent imports
import Task from "../task/issue-task";

export default class Column extends Component {
  render = () => {
    return (
      <Droppable droppableId={this.props.column.id}>
        {provided => (
          <div className={"col-md-3 " + this.props.column.id}>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className=" issue-cards-container col-md-11"
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
            </div>
            <div className="col-md-1" />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };
}
