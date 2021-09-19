import React, { useState } from "react";

import { Button, Form, Input, Segment } from "semantic-ui-react";

import { login, getTodos } from "../controllers/Api.controller";

import { useHistory } from "react-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let history = useHistory();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const login_res = await login(username, password);
      if (login_res.success) {
        const getTodos_res = await getTodos();
        if (getTodos_res.success) {
          setError(null);
          history.push("/");
        } else {
          setError(getTodos_res.message);
        }
      } else {
        setError(login_res.message);
      }
    } catch (exception) {
      setError(exception.message);
    }
    console.log(error);
    setLoading(false);
  };

  return (
    <Segment>
      <Input
        loading={loading}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="username"
        type="text"
      />
      <Input
        loading={loading}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
        type="password"
      />
      <Button loading={loading} onClick={handleLogin}>
        Login
      </Button>
    </Segment>
  );
}
