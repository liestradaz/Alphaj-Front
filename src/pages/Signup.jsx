import React, { useState } from "react";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
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
  Text,
  Link
} from "@chakra-ui/react";
import { Link as ReactDomLink } from "react-router-dom";


export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      email,
      password,
    };
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      // successful signup
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }

  return (
    <Flex justify="center" align="center" direction="column">
      <Stack spacing="9">
        <Heading size="2xl">Sign up</Heading>
        <Container borderWidth="1px" p="5">
          <form onSubmit={handleFormSubmission}>
            <Stack spacing="5">
              <InputGroup>
                <InputLeftAddon children="Username" />
                <Input
                  type="text"
                  name="username"
                  placeholder="JohnDoe"
                  value={username}
                  onChange={handleInputChange}
                  isRequired
                />
              </InputGroup>

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
              <Text align={'center'}>
                Already a user? <Link as={ReactDomLink} to='/auth/login' color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </form>
        </Container>
      </Stack>
    </Flex>
  );
}
