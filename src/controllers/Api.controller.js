import api from "../api/todo";

export const login = async (username, password) => {
  // login
  try {
    const res = await api.request({
      url: "/auth/login",
      method: "post",
      data: { username, password },
    });

    api.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
    localStorage.setItem("token", res.data.token);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const createAccount = async (username, password) => {
  // login
  try {
    const res = await api.request({
      url: "/auth/create",
      method: "post",
      data: { username, password },
    });

    api.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;

    return { success: true };
  } catch (exception) {
    return { success: false, message: exception.message };
  }
};

export const postNewTodo = async (todoText) => {
  // post a new todo
  try {
    const res = await api.request({
      url: "/todo/create",
      method: "post",
      data: { text: todoText },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getTodos = async () => {
  // get todos
  try {
    const res = await api.request({
      url: "/todo/get",
      method: "get",
    });

    let todos = res.data;
    todos.todos.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      } else if (a.date < b.date) {
        return 1;
      } else {
        return 0;
      }
    });

    return { success: true, data: todos };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const deleteTodo = async (todoListId, todoItemId) => {
  // delete a new todo
  try {
    const res = await api.request({
      url: "/todo/delete",
      method: "delete",
      data: { todoListId, todoItemId },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const markTodoAsComplete = async (todoListId, todoItemId) => {
  // mark as complete
  try {
    const res = await api.request({
      url: "/todo/complete",
      method: "patch",
      data: { todoListId, todoItemId },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const editTodo = async (todoListId, todoItemId, text) => {
  // edit a todo
  try {
    const res = await api.request({
      url: "/todo/edit",
      method: "patch",
      data: { todoListId, todoItemId, text },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getServer = async () => {
  // get server
  try {
    const res = await api.request({
      url: "",
      method: "get",
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const checkLocalStorageToken = async (token) => {
  // check the local storage for token
  try {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
  } catch (error) {
    
  }
}
