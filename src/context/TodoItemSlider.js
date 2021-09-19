/* eslint-disable import/no-anonymous-default-export */
import { useState, createContext, useEffect } from "react";

import {
  Sidebar,
  Segment,
  Grid,
  Menu,
  Header,
  Button,
} from "semantic-ui-react";

export const SideBarContext = createContext();

export default () => {
  const [visible, setVisible] = useState(false);
  const [todoItem, setTodoItem] = useState(null);

  const openSidebar = (todo) => {
    console.log(todo);
    setTodoItem(todo);
  };

  useEffect(() => {
    if (todoItem) {
      setVisible(true);
    }
  }, [todoItem]);

  return [
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      direction="right"
      onHide={() => setVisible(false)}
      vertical
      visible={visible && todoItem}
    >
      <Grid textAlign="center">
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header as="h3">_id : {todoItem ? todoItem._id : null}</Header>
            <Header as="h3">text: {todoItem ? todoItem.text : null}</Header>
            <Header as="h3">completed : {todoItem ? todoItem.completed : null}</Header>
            <Header as="h3">created: {todoItem ? todoItem.created : null}</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Sidebar>,
    { openSidebar },
  ];
};
