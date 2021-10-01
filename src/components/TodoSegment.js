import React, { useContext } from "react";

import { Icon, Label } from "semantic-ui-react";

import { formatDateToText } from "../functions/general.functions";

import { SideBarContext } from "../context/TodoItemSlider";
import { TodoContext } from "../screens/MainScreen";

export default function TodoSegment({ item }) {
  const { openSidebar } = useContext(SideBarContext);
  const { setListId, toggleComplete } = useContext(TodoContext);

  return (
    <>
      <div
        style={{ margin: "15px 0px", cursor: "pointer" }}
        onClick={() => {
          setListId(item._id);
        }}
      >
        <Label
          size="large"
          style={{
            backgroundColor: "#242426",
            color: "#C55F5D",
          }}
        >
          <Icon name="angle down" />
          {item.title}
          <Label.Detail>{item.items.length}</Label.Detail>
        </Label>
      </div>
      {item.items.map((todo) => {
        console.log("Rendering todo item");
        return (
          <div
            style={{
              display: "flex",
              height: 60,
              width: "100%",
              backgroundColor: "#242426",
              borderRadius: 3,
              margin: "3px 0px",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Icon
              onClick={() => {
                toggleComplete(item._id, todo._id);
              }}
              fitted
              link
              size="big"
              inverted
              name={todo.completed ? "check circle" : "circle outline"}
              style={{ color: todo.completed ? "#788CDE" : "#939393" }}
            />
            <span
              style={{
                fontSize: 15,
                color: "white",
                marginLeft: 20,
                ...todo.completed ? {textDecoration: "line-through"} : {},
              }}
            >
              {todo.text}
            </span>
          </div>
        );
      })}
    </>
  );
}
