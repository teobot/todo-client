import React, { useState } from "react";

import {
  Button,
  Container,
  Form,
  Input,
  Segment,
  Loader,
} from "semantic-ui-react";

import { login, getTodos } from "../controllers/Api.controller";

import { useHistory } from "react-router";

import "../css/App.css";

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

  if (loading) {
    return (
      <div className="h-100 w-100">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="h-100 w-100"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Segment>
          <Form>
            <Form.Field>
              <label>Username</label>
              <Input
                loading={loading}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="username"
                type="text"
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input
                loading={loading}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
                type="password"
              />
            </Form.Field>
            <Form.Field>{/* <a>no account? make one here</a> */}</Form.Field>
            <Button loading={loading} onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Segment>
      </Container>
    </div>
  );
}
