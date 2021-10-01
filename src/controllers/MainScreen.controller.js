/* eslint-disable import/no-anonymous-default-export */

import { useState, useEffect } from "react";

import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  compareDesc,
} from "date-fns";

import { formatDateToText } from "../functions/general.functions";

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
} from "./Api.controller.js";

export default () => {
  const [todoData, setTodoData] = useState(null);
  const [listTitle, setListTitle] = useState("");
  const [listId, setListId] = useState(null);
  const [todoText, setTodoText] = useState("");
  const [lastSetId, _setLastSetId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const todos_response = await getTodos();
      sortTodoData(todos_response.data);
    } catch (error) {
      // : handle error
    }
    setIsLoading(false);
  };

  const createListSubmit = async () => {
    try {
      const res = await createList(listTitle);
      sortTodoData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTodoItem = async (_todoText, _listId) => {
    if (_todoText.length <= 0) {
      return;
    }
    try {
      const res = await postNewTodo(_todoText, _listId);
      sortTodoData(res.data);
      setTodoText("");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (todoListId, todoItemId) => {
    try {
      const res = await markTodoAsComplete(todoListId, todoItemId);
      sortTodoData(res.data);
    } catch (error) {}
  };

  const handleListDelete = async (listId) => {
    try {
      // delete the given list
      const res = await deleteList(listId);
      sortTodoData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodoDelete = async (todoListId, todoItemId) => {
    try {
      // handle delete a todo
      const res = await deleteTodo(todoListId, todoItemId);
      sortTodoData(res.data);
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

  const handleTodoSubmit = async () => {
    let _lid = listId ? listId : todoData.todos[0]._id;
    await createTodoItem(todoText, _lid);
  };

  const sortTodoData = (dd) => {
    if (!dd) return null;

    for (let i = 0; i < dd.todos.length; i++) {
      dd.todos[i].items.sort((a, b) => {
        return compareDesc(new Date(a.created), new Date(b.created));
      });
    }

    dd.todos.sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

    setTodoData(dd);

    console.log({ message: `Rendering todoData`, data: dd });
  };

  return {
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
  };
};
