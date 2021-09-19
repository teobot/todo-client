import React, { useContext } from "react";

import { Icon } from "semantic-ui-react";

import { formatDateToText } from "../functions/general.functions";

import { SideBarContext } from "../context/TodoItemSlider";

export default function TodoSegment({ setId, item }) {
  const { _id, date, items } = item;

  const subText = formatDateToText(new Date(date));

  const { openSidebar } = useContext(SideBarContext);

  return (
    <>
      <div
        style={{
          backgroundColor: "#242426",
          width: 150,
          height: 32,
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          color: "white",
          margin: "15px 0px",
          fontSize: 12,
        }}
      >
        <span>&#8681;</span>
        <span
          onClick={() => {
            setId(_id);
          }}
          style={{ cursor: "pointer" }}
        >
          {subText}
        </span>
        <span>{items.length}</span>
      </div>
      {items.map((t) => {
        return (
          <div
            style={{
              display: "flex",
              height: 60,
              width: "100%",
              backgroundColor: "#242426",
              borderRadius: 5,
              margin: "3px 0px",
              alignItems: "center",
              padding: 10,
            }}
            onClick={() => {
              openSidebar(t);
            }}
          >
            <Icon
              fitted
              size="big"
              inverted
              name="circle outline"
              style={{ color: "#939393" }}
            />
            <span
              style={{
                fontSize: 15,
                color: "white",
                marginLeft: 20,
              }}
            >
              {t.text}
            </span>
          </div>
        );
      })}
    </>
  );
}
