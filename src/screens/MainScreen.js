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

import { useHistory } from "react-router";

import {
  getTodos,
  checkLocalStorageToken,
  postNewTodo,
} from "../controllers/Api.controller";

import { formatDateToText } from "../functions/general.functions";

export default function MainScreen() {
  const [todoData, setTodoData] = useState(null);
  const [id, setId] = useState(null);
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
    } catch (error) {
      // TODO: handle error
    }
  };

  const countAllTodoItems = () => {
    let count = 0;
    todoData.todos.forEach((element) => {
      count += element.items.length;
    });
    return count;
  };

  const handleTodoSubmit = async () => {
    try {
      const todo_res = await postNewTodo(todoText);
      console.log(todo_res);
      if (todo_res.success) {
        setTodoData(todo_res.data);
        setTodoText("");
      }
    } catch (error) {
      // TODO, handle error
    }
  };

  if (!todoData) {
    // TODO
    return <div>Loading...</div>;
  }

  return (
    <Grid
      vertical
      style={{
        display: "flex",
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundImage: "linear-gradient(#667EEA, #764BA2)",
        margin: 0,
      }}
    >
      <Grid.Column
        width={3}
        style={{
          backgroundColor: "#242426",
          padding: 0,
          maxHeight: "100%",
          overflowY: "auto",
          margin: 0,
          webkitScrollbarDisplay: "none",
        }}
      >
        <MenuListItem
          id={id}
          setId={setId}
          itemId={null}
          text="All"
          subText={countAllTodoItems()}
          icon="sort amount down"
        />

        {todoData.todos.map((item, index) => {
          return (
            <MenuListItem
              id={id}
              setId={setId}
              itemId={item._id}
              text={formatDateToText(item.date)}
              subText={item.items.length}
              icon="rebel"
            />
          );
        })}
      </Grid.Column>
      <Grid.Column
        width={13}
        style={{ maxHeight: "100%", overflowY: "auto", padding: "20px 30px" }}
      >
        <Divider hidden />
        {id === null ? (
          todoData.todos.map((item) => {
            return <TodoSegment item={item} setId={setId} />;
          })
        ) : (
          <TodoSegment
            item={todoData.todos.find((element) => element._id === id)}
            setId={setId}
          />
        )}
        <Divider hidden />
        <div
          style={{
            position: "sticky",
            height: 115,
            padding: 15,
            backgroundColor: "rgba(36, 36, 38, 0.9)",
            bottom: -20,
            right: 0,
            left: 0,
            width: "100%",
          }}
        >
          <Input
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
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
        </div>
      </Grid.Column>
    </Grid>
  );
}
