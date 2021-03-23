import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Toast } from "react-bootstrap";
import logo from "../../assets/logo-white.png";
import axios from "axios";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const base_url = process.env.REACT_APP_BACKEND_URL;

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setUsername("");
    setEmail("");
  };

  const createUser = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      username: username,
    };
    axios
      .post(`${base_url}/auth/signup`, data)
      .then((response) => {
        if ([200, 201].includes(response.status)) {
          setShowToast(true);
          clearForm();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <div className="col-md-2"></div>
          <Col md={8}>
            <div className="register-form">
              <Col md={6} lg={6} className="left-col">
                <div className="reg-image">
                  <img src={logo} alt="logo" />
                </div>
              </Col>
              <Col md={6} lg={6} className="right-col">
                <Form>
                  <h2>Create an account</h2>
                  <Toast
                    show={showToast}
                    onClose={() => setShowToast(!showToast)}
                  >
                    <Toast.Header>
                      <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                      />
                      <strong className="mr-auto">Signup Successful</strong>
                    </Toast.Header>
                    <Toast.Body>Signup was successful</Toast.Body>
                  </Toast>
                  <Form.Group controlId="formGroupFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={firstName}
                      placeholder="Enter first name"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupLastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={lastName}
                      placeholder="Enter last name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupUsername">
                    <Form.Label>Preferred Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="zenon"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Button
                    disabled={showToast}
                    variant="primary"
                    onClick={() => {
                      createUser();
                    }}
                  >
                    Submit
                  </Button>
                </Form>
                <p className="pt-4 ">
                  Already have an account?
                  <Link to="/login"> Login</Link>
                </p>
              </Col>
            </div>
          </Col>
          <div className="col-md-2"></div>
        </Row>
      </Container>
    </div>
  );
};
