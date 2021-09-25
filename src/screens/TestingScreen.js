import { useState, createContext, useEffect, useContext } from "react";

import {
  Container,
  Table,
  Button,
  Icon,
  Input,
  Form,
  Segment,
  Divider,
  Header,
  Progress,
  Menu,
  List,
} from "semantic-ui-react";

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

import { format } from "date-fns";

import { useHistory } from "react-router";

export const DataContext = createContext();

export default function TestingScreen() {
  const [todoData, setTodoData] = useState(null);
  const [listTitle, setListTitle] = useState("");
  const [id, setId] = useState(null);

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
      // TODO: handle error
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

  if (!todoData) {
    // TODO
    return <div>Loading...</div>;
  }

  return (
    <DataContext.Provider
      value={{
        createTodoItem,
        toggleComplete,
        handleListDelete,
        editTodo,
        handleTodoDelete,
        setTodoData,
      }}
    >
      <Container>
        <Divider hidden />
        <div
          style={{
            overflowY: "auto",
            padding: 10,
            height: document.documentElement.clientHeight,
          }}
        >
          <>
            <Segment>
              <Form>
                <Form.Field>
                  <input
                    onChange={(e) => {
                      setListTitle(e.target.value);
                    }}
                    value={listTitle}
                    placeholder="List Title"
                  />
                </Form.Field>
                <Button onClick={createListSubmit} type="submit">
                  Submit List
                </Button>
              </Form>
            </Segment>
            {todoData.todos
              .sort(function compare(a, b) {
                if (new Date(a.date) < new Date(b.date)) {
                  return 1;
                } else {
                  return -1;
                }
              })
              .map((list) => {
                const percentage =
                  (list.items.filter((todo) => {
                    if (todo.completed) {
                      return todo;
                    }
                  }).length *
                    100) /
                  list.items.length;
                return (
                  <>
                    <Segment>
                      <Progress
                        indicating
                        percent={percentage ? percentage : 0}
                        attached="top"
                      />
                      <TodoList list={list} />
                    </Segment>
                    <Divider section hidden />
                  </>
                );
              })}
          </>
        </div>
      </Container>
    </DataContext.Provider>
  );
}

function TodoList({ list }) {
  const [todoText, setTodoText] = useState("");
  const { createTodoItem, handleListDelete } = useContext(DataContext);

  const handleTodoItemCreation = async () => {
    await createTodoItem(todoText, list._id);
    setTodoText("");
  };
  return (
    <Table selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">
            <Menu>
              <Menu.Item header>{list.title}</Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item>
                  <Button
                    onClick={() => {
                      handleListDelete(list._id);
                    }}
                    negative
                    icon
                    circular
                  >
                    <Icon name="trash alternate" />
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Table.HeaderCell>
          <Table.HeaderCell
            colSpan="1"
            textAlign="center"
            verticalAlign="middle"
          >
            list created {formatDateToText(list.date)}.
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row textAlign="center" verticalAlign="middle">
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Created</Table.HeaderCell>
          <Table.HeaderCell>Option</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {[...list.items]
          .sort(function compare(a, b) {
            if (new Date(a.date) < new Date(b.date)) {
              return 1;
            } else {
              return -1;
            }
          })
          .map((item) => {
            return <TodoItem listId={list._id} item={item} />;
          })}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row verticalAlign="middle" textAlign="center">
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>
            <Header as="h4" style={{ margin: 0, padding: 0 }}>
              Completed :{" "}
              {list.items
                ? list.items.filter((todo) => {
                    if (todo.completed) {
                      return todo;
                    }
                  }).length
                : "..."}
              /{list.items.length}
            </Header>
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell colSpan="2">
            <Input
              style={{ width: "100%" }}
              onChange={(e) => {
                setTodoText(e.target.value);
              }}
              value={todoText}
              placeholder="Todo Title"
            />
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="1">
            <Button primary fluid onClick={handleTodoItemCreation}>
              Add Todo
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}

function TodoItem({ listId, item }) {
  const { toggleComplete, editTodo, handleTodoDelete, setTodoData } =
    useContext(DataContext);

  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    setTodoText(item.text);
  }, [item.text]);

  const handleTodoTextChange = async () => {
    if (item.text === todoText) {
      return;
    }
    try {
      const res = await editTodo(listId, item._id, todoText);
      setTodoData(res.data);
    } catch (error) {}
  };

  return (
    <Table.Row
      verticalAlign="middle"
      textAlign="center"
      negative={!item.completed}
    >
      <Table.Cell width="5">
        <Input
          fluid
          size="large"
          onChange={(e) => {
            setTodoText(e.target.value);
          }}
          value={todoText}
          icon={
            <Icon
              name="save"
              color={item.text !== todoText ? "blue" : "green"}
              disabled={item.text === todoText}
              inverted
              circular
              link={item.text !== todoText}
              onClick={handleTodoTextChange}
            />
          }
        />
      </Table.Cell>
      <Table.Cell width="1">
        {format(new Date(item.created), "dd/MM/yyyy hh:mm")}
      </Table.Cell>
      <Table.Cell width="2">
        <List horizontal celled verticalAlign="middle">
          <List.Item>
            <Button
              negative={!item.completed}
              positive={item.completed}
              onClick={() => {
                toggleComplete(listId, item._id);
              }}
              icon
              circular
            >
              <Icon
                name={
                  item.completed ? "check circle outline" : "circle outline"
                }
              />
            </Button>
          </List.Item>

          <List.Item>
            <Button
              onClick={() => {
                handleTodoDelete(listId, item._id);
              }}
              negative
              circular
              icon
            >
              <Icon name="trash alternate" />
            </Button>
          </List.Item>
        </List>
      </Table.Cell>
    </Table.Row>
  );
}
