import React from "react";

import { Icon } from "semantic-ui-react";

export default function MenuListItem({
  id,
  setListId,
  itemId,
  text,
  subText,
  icon,
  color
}) {
  const isSelected = itemId === id;

  const colorStyle = color ? color : "#6372B0"

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        height: 50,
        padding: "5px",
        width: "100%",
        ...(isSelected ? { backgroundColor: "#28282B" } : {}),
        cursor: "pointer",
      }}
      onClick={() => {
        setListId(itemId);
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          ...(isSelected ? { borderLeft: `3px solid ${colorStyle}` } : {}),
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
        <Icon
          fitted
          size="large"
          style={{ color: isSelected ? "#6372B0" : "#6E7981" }}
          name={icon}
        />
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
        <span style={{ color: "#CBCBCB", fontSize: 16 }}>{text}</span>
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
