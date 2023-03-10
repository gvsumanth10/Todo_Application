import "./App.css";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button
} from "@mui/material";


function App() {
  const [text, setText] = useState("");
  const [state, setState] = useState({
    todo: {
      title: "Not Started",
      items: [],
      css: {
        "background-color":"powderblue",
        "padding":"10px",
        "border-color": "powderblue",
        "border-radius":"5px"
      }
    },
    inprogress: {
      title: "In Progress",
      items: [],
      css: {
        "background-color":"powderblue",
        "padding":"10px",
        "border-color": "powderblue",
        "border-radius":"5px"
      }
    },
    done: {
      title: "Completed",
      items: [],
      css: {
        "background-color":"powderblue",
        "padding":"10px",
        "border-color": "powderblue",
        "border-radius":"5px"
      }
    }
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source
    )
      return;

    const itemcopy = { ...state[source.droppableId].items[source.index] };
    console.log(destination);

    setState((prev) => {
      prev = { ...prev };
      prev[source.droppableId].items.splice(source.index, 1);
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemcopy
      );
      return prev;
    });
  };

  const addItem = () => {
    if (!text) return;
    setState((prev) => {
    return {
    ...prev,
    todo: {
    title: "To-Do",
    items: [{ id: v4(), name: text }, ...prev.todo.items],
    css: {
      "background-color":"powderblue",
      "padding":"10px",
      "border-color": "powderblue",
      "border-radius":"5px"
    }
    }
  };
  });
  setText("");
  };
  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <br />

    <div className="add_todo">
    <Dialog open={open} onClose={handleToClose}>
    <DialogTitle>{"Add New Task"}</DialogTitle>
    <DialogContent>
    <input
    type="text" placeholder="Type a task"
      value={text}
      onChange={(e) => setText(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
    <Button 
    onClick={() => {
    handleToClose();
    addItem();
    }}
    color="primary"
    autoFocus
    >
    Add
    </Button>
    </DialogActions>
    </Dialog>

    <Button style={{
      position: "absolute", left:'1190px', top:'50px',
      backgroundcolor:'rgb(21, 240, 21)',color:'black',fontWeight:'bold',borderradius:'5px'}}
          variant="outlined"
          className="addbutton"          
          onClick={handleClickToOpen}
        >
          {" "}
          New Task +
        </Button>
      </div>
    <div className="drop">
    <DragDropContext onDragEnd={handleDragEnd}>
    {_.map(state, (data, key) => {
    return (
      <div key={key} className="column">
      <h2 className="datatitle" style={data.css}>
      {data.title}
      </h2>

      <Droppable droppableId={key}>
      {(provided) => {
      return (
      <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className="droppable_column"
      >
      {data.items.map((element, index) => {
        return (
        <Draggable
        key={element.id}
                              index={index}
                              draggableId={element.id.toString()}
                              className="draggable_item"
        >
        {(provided) => {
        return (
        <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={key.toString()}
        >
        {element.name}
        </div>
        );
       }}
      </Draggable>
      );
      })}
    {provided.placeholder}
    </div>
          
       );
       }}
       </Droppable>
       </div>
        );
      })}
    </DragDropContext>
    </div>
    </div>
  );
}

export default App;