import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Signup";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import {
  Flex,
  Stack,
  Heading,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Container,
} from "@chakra-ui/react";

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      email,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }

  return (
    <Flex justify="center" align="center" direction="column">
      <Stack spacing="9">
        <Heading size="2xl">Log In</Heading>
        <Container borderWidth="1px" p="5">
          <form onSubmit={handleFormSubmission}>
            <Stack spacing="5">
              <InputGroup>
                <InputLeftAddon children="Email" />
                <Input
                  type="text"
                  name="email"
                  placeholder="john@doe.com"
                  value={email}
                  onChange={handleInputChange}
                  isRequired
                />
              </InputGroup>

              <InputGroup>
                <InputLeftAddon children="Password" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleInputChange}
                  isRequired
                  minLength="8"
                />
              </InputGroup>

              {error && (
                <div className="error-block">
                  <p>There was an error submiting the form:</p>
                  <p>{error.message}</p>
                </div>
              )}

              <Button type="submit" colorScheme="green">
                Submit
              </Button>
            </Stack>
          </form>
        </Container>
      </Stack>
    </Flex>
  );
}
