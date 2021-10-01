import { createContext } from "react";

import "../css/App.css";

import {
  Container,
  Grid,
  Checkbox,
  Sidebar,
  Segment,
  Menu,
  Icon,
  Header,
  Image,
  List,
  Label,
  Divider,
  Input,
} from "semantic-ui-react";

import TodoSegment from "../components/TodoSegment";

import MainController from "../controllers/MainScreen.controller";
import MenuListItem from "../components/MenuListItem";

export const TodoContext = createContext();

export default function MainScreen() {
  const {
    todoData,
    listTitle,
    setListTitle,
    listId,
    setListId,
    todoText,
    setTodoText,
    createListSubmit,
    toggleComplete,
    handleListDelete,
    handleTodoDelete,
    countTodos,
    handleTodoSubmit,
    isLoading,
  } = MainController();

  if (isLoading || !todoData) {
    return <div>Loading</div>;
  } else {
    return (
      <TodoContext.Provider
        value={{
          toggleComplete,
          setListId,
        }}
      >
        <Grid
          className="h-100 w-100 p-0"
          style={{
            margin: 0,
          }}
        >
          <Grid.Column width={3} className="h-100 p-0 b-0">
            <Menu
              vertical
              className="w-100 h-100 b-0"
              style={{ backgroundColor: "#242426" }}
            >
              <MenuListItem
                id={listId}
                setListId={setListId}
                itemId={null}
                text={"All"}
                subText={countTodos()}
                icon="list"
                color="red"
              />

              <Menu.Item>
                <Input
                  className="settingInput"
                  value={listTitle}
                  onChange={(e) => setListTitle(e.target.value)}
                  icon={
                    <Icon
                      name="add"
                      inverted
                      circular
                      link
                      onClick={createListSubmit}
                    />
                  }
                  placeholder="New List..."
                />
              </Menu.Item>

              {todoData.todos.map((item, index) => {
                return (
                  <MenuListItem
                    id={listId}
                    setListId={setListId}
                    itemId={item._id}
                    text={item.title}
                    subText={item.items.length}
                    icon="list"
                  />
                );
              })}
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={13} className="h-100 p-0">
            <div
              className="ui segment inverted h-100 w-100 b-0"
              style={{
                overflowY: "auto",
                padding: "1em 1em 0 1em",
              }}
            >
              <Segment inverted basic>
                <Header as="h1">
                  <Icon name="list" />
                  <Header.Content>
                    {listId
                      ? todoData.todos.find(function (item) {
                          return item._id === listId;
                        }).title
                      : "All"}
                  </Header.Content>
                </Header>
              </Segment>
              {listId === null ? (
                todoData.todos.map((item) => {
                  return <TodoSegment item={item} />;
                })
              ) : (
                <TodoSegment
                  item={todoData.todos.find(
                    (element) => element._id === listId
                  )}
                />
              )}
              <div
                className="w-100 ui segment inverted"
                style={{
                  position: "sticky",
                  bottom: 0,
                  right: 0,
                  left: 0,
                  width: "100%",
                  margin: 0,
                  padding: "15px 0px",
                }}
              >
                <Input
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleTodoSubmit();
                    }
                  }}
                  onChange={(e) => {
                    setTodoText(e.target.value);
                  }}
                  className="settingInput"
                  value={todoText}
                  icon={
                    <Icon
                      name="plus"
                      inverted
                      link
                      onClick={handleTodoSubmit}
                    />
                  }
                  style={{ padding: 0, margin: "5px 0px 15px 0px" }}
                  iconPosition="left"
                  fluid
                  size="huge"
                  placeholder="Add a task"
                />
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </TodoContext.Provider>
    );
  }
}
