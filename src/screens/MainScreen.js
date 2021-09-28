import { useState, useEffect } from "react";

import "../css/App.css";

import { format, formatDistance, formatRelative, subDays } from "date-fns";

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

import MenuListItem from "../components/MenuListItem";
import TodoSegment from "../components/TodoSegment";

import TestingScreen from "./TestingScreen";

import { useHistory } from "react-router";

import {
  createList,
  postNewTodo,
  markTodoAsComplete,
  deleteList,
  editTodo,
  checkLocalStorageToken,
  getTodos,
  deleteTodo,
} from "../controllers/Api.controller";

import { formatDateToText } from "../functions/general.functions";

export default function MainScreen() {
  const [todoData, setTodoData] = useState(null);
  const [listTitle, setListTitle] = useState("");
  const [listId, setListId] = useState(null);
  const [todoText, setTodoText] = useState("");

  let history = useHistory();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      // check if localstorage has a token
      const token = await localStorage.getItem("token");
      if (!token) {
        // if not, redirect to login
        history.push("/login");
      } else {
        await checkLocalStorageToken(token);
        await getData();
      }
    } catch (error) {
      history.push("/login");
    }
  };

  const getData = async () => {
    try {
      const todos = await getTodos();
      setTodoData(todos.data);
      console.log(todos.data);
    } catch (error) {
      // : handle error
    }
  };

  const createListSubmit = async () => {
    try {
      const res = await createList(listTitle);
      setTodoData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTodoItem = async (todoText, listId) => {
    if (todoText.length <= 0) {
      return;
    }
    try {
      const res = await postNewTodo(todoText, listId);
      setTodoData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (todoListId, todoItemId) => {
    try {
      const res = await markTodoAsComplete(todoListId, todoItemId);
      setTodoData(res.data);
    } catch (error) {}
  };

  const handleListDelete = async (listId) => {
    try {
      // delete the given list
      const res = await deleteList(listId);
      setTodoData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodoDelete = async (todoListId, todoItemId) => {
    try {
      // handle delete a todo
      const res = await deleteTodo(todoListId, todoItemId);
      setTodoData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const countTodos = () => {
    let c = 0;
    for (let i = 0; i < todoData.todos.length; i++) {
      c += todoData.todos[i].items.length;
    }
    return c;
  };

  const handleTodoSubmit = () => {};

  if (!todoData) {
    return <div>Loading</div>;
  } else {
    return (
      <Grid
        style={{
          height: "100%",
          margin: 0,
          backgroundImage: "linear-gradient(#667EEA, #764BA2)",
        }}
      >
        <Grid.Column width={3}>
          <Menu vertical inverted style={{ height: "100%", width: "100%" }}>
            <Menu.Item
              onClick={() => {
                setListId(null);
              }}
              active={!listId}
              name="all"
              link
            >
              <Label color="teal">{countTodos()}</Label>
              All
            </Menu.Item>

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
                <Menu.Item
                  onClick={() => {
                    setListId(item._id);
                  }}
                  active={listId === item._id}
                  name={item.title}
                  link
                >
                  <Label color="teal">{item.items.length}</Label>
                  {item.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={13}>
          <Segment inverted style={{ overflowY: "auto" }}>
            {listId === null ? (
              todoData.todos.map((item) => {
                return <TodoSegment item={item} setId={setListId} />;
              })
            ) : (
              <TodoSegment
                item={todoData.todos.find((element) => element._id === listId)}
                setId={setListId}
              />
            )}
            <Segment
              inverted
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                width: "100%",
              }}
              compact
            >
              <Input
                onChange={(e) => {
                  setTodoText(e.target.value);
                }}
                className="settingInput"
                value={todoText}
                icon={
                  <Icon
                    name="add"
                    inverted
                    circular
                    link
                    onClick={() => {
                      handleTodoSubmit();
                    }}
                  />
                }
                iconPosition="left"
                fluid
                placeholder="Add a task"
              />
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }

  // <TodoSegment
  //   item={todoData.todos.find((element) => element._id === id)}
  //   setId={setId}
  // />

  // return (
  //   <Grid
  //     vertical
  //     style={{
  //       display: "flex",
  //       flex: 1,
  //       height: "100%",
  //       width: "100%",
  //       backgroundImage: "linear-gradient(#667EEA, #764BA2)",
  //       margin: 0,
  //     }}
  //   >
  //     <Grid.Column
  //       width={3}
  //       style={{
  //         backgroundColor: "#242426",
  //         padding: 0,
  //         maxHeight: "100%",
  //         overflowY: "auto",
  //         margin: 0,
  //         webkitScrollbarDisplay: "none",
  //       }}
  //     >
  //       <MenuListItem
  //         id={id}
  //         setId={setId}
  //         itemId={null}
  //         text="All"
  //         subText={countAllTodoItems()}
  //         icon="sort amount down"
  //       />

  //       {todoData.todos.map((item, index) => {
  //         return (
  //           <MenuListItem
  //             id={id}
  //             setId={setId}
  //             itemId={item._id}
  //             text={formatDateToText(item.date)}
  //             subText={item.items.length}
  //             icon="rebel"
  //           />
  //         );
  //       })}
  //     </Grid.Column>
  //     <Grid.Column
  //       width={13}
  //       style={{ maxHeight: "100%", overflowY: "auto", padding: "20px 30px" }}
  //     >
  //       <Divider hidden />
  //       {id === null ? (
  //         todoData.todos.map((item) => {
  //           return <TodoSegment item={item} setId={setId} />;
  //         })
  //       ) : (
  //         <TodoSegment
  //           item={todoData.todos.find((element) => element._id === id)}
  //           setId={setId}
  //         />
  //       )}
  //       <Divider hidden />
  //       <div
  //         style={{
  //           position: "sticky",
  //           height: 115,
  //           padding: 15,
  //           backgroundColor: "rgba(36, 36, 38, 0.9)",
  //           bottom: -20,
  //           right: 0,
  //           left: 0,
  //           width: "100%",
  //         }}
  //       >
  //         <Input
  //           onChange={(e) => {
  //             setTodoText(e.target.value);
  //           }}
  //           value={todoText}
  //           icon={
  //             <Icon
  //               name="add"
  //               inverted
  //               circular
  //               link
  //               onClick={() => {
  //                 handleTodoSubmit();
  //               }}
  //             />
  //           }
  //           iconPosition="left"
  //           fluid
  //           placeholder="Add a task"
  //         />
  //       </div>
  //     </Grid.Column>
  //   </Grid>
  // );
}
