import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Toast } from "react-bootstrap";
import axios from "axios";

export const CreatePost = () => {
  const [company, setCompany] = useState("");
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [showToast, setShowToast] = useState(false);

  const availableTags = [
    "scam",
    "investment",
    "marketing",
    "sales",
    "ponzi",
    "referrer",
  ];

  const token = JSON.parse(sessionStorage.getItem("user_payload")).token;

  const selectedTags = tags.filter((tg) => tg.isChecked === true);

  const tagged = selectedTags.map((tg) => tg.name);

  const createPost = () => {
    const data = {
      company: company,
      tags: tagged.length === 0 ? ["random"] : tagged,
      title: title,
      post: post,
      image_url: "",
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/posts/create`, data, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        if ([200, 201].includes(response.status)) {
          setShowToast(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="create__post my-5">
      <Container>
        <Row>
          <div className="header">
            <h2>
              Had one or two experience as well? <br /> Let's hear from you
            </h2>
          </div>
        </Row>
        <Row>
          <Col md={2} lg={2} sm={12} xs={12}></Col>
          <Col md={8} lg={8} sm={12} xs={12}>
            <Form>
              <Toast show={showToast} onClose={() => setShowToast(!showToast)}>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                  />
                  <strong className="mr-auto">Post created</strong>
                </Toast.Header>
                <Toast.Body>post has been created successfully</Toast.Body>
              </Toast>
              <Form.Group controlId="formGroupFirstName">
                <Form.Label>Company/Organization</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="X & Y Global Investments"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formGroupLastname">
                <Form.Label>Tags</Form.Label>
                <div key={`inline-checkbox`} className="mb-3">
                  {availableTags.map((tag) => (
                    <Form.Check
                      inline
                      label={tag}
                      type="checkbox"
                      onChange={(e) => {
                        let filtered = tags.filter(function (el) {
                          return el.name !== tag;
                        });
                        filtered.push({
                          name: tag,
                          isChecked: e.target.checked,
                        });
                        setTags(filtered);
                      }}
                      id={`inline-checkbox-1`}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group controlId="formGroupUsername">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="createPost.ControlTextarea1">
                <Form.Label>Share a detailed experience</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={post}
                  onChange={(e) => {
                    setPost(e.target.value);
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => {
                  createPost();
                }}
              >
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={2} lg={2} sm={12} xs={12}></Col>
        </Row>
      </Container>
    </div>
  );
};
