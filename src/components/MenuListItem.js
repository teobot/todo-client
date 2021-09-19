import React from "react";

import { Icon } from "semantic-ui-react";

export default function MenuListItem({ id, setId, itemId, text, subText, icon }) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        height: 50,
        padding: "5px",
        width: "100%",
        ...(itemId === id ? { backgroundColor: "#28282B" } : {}),
        cursor: "pointer",
      }}
      onClick={() => {
        setId(itemId);
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      />
      <div
        style={{
          display: "flex",
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon fitted size="big" color="red" name={icon} />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      />
      <div
        style={{
          display: "flex",
          flex: 10,
          alignItems: "center",
        }}
      >
        <span style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>
          {text}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ color: "grey", fontWeight: "bold", fontSize: 15 }}>
          {subText}
        </span>
      </div>
    </div>
  );
}
