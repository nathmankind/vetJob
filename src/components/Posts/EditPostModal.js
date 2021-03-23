import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Toast } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const EditPostModal = (props) => {
  const [companyName, setComapanyname] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState();
  const [showToast, setShowToast] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);

  const history = useHistory();
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const user_payload = JSON.parse(sessionStorage.getItem("user_payload"));

  const handleClose = () => setShowLoginModal(false);

  useEffect(() => {
    if (props.show === true && user_payload !== null) {
      axios
        .get(`${base_url}/posts/${props.post_id}`, {
          headers: {
            token: `${user_payload.token}`,
          },
        })
        .then((res) => {
          setComapanyname(res.data.data[0].company);
          setTitle(res.data.data[0].title);
          setBody(res.data.data[0].post);
        });
    }
  }, []);

  if (props.show === true && user_payload === null) {
    return (
      <Modal
        show={showLoginModal}
        onHide={() => {
          props.onHide();
          handleClose();
        }}
      >
        <Modal.Body>You're not logged in.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.onHide();
              handleClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const handleEditSubmit = () => {
    const data = {
      company: companyName,
      title: title,
      post: body,
    };

    axios
      .put(`${base_url}/posts/${props.post_id}`, data, {
        headers: {
          token: `${user_payload.token}`,
        },
      })
      .then(
        (response) => {
          if ([200, 201].includes(response.status)) {
            setTimeout(() => {
              setShowToast(true);
              window.location.reload();
            }, 3000);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <Modal
      {...props}
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Toast show={showToast} onClose={() => setShowToast(!showToast)}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Edit Successful</strong>
          </Toast.Header>
          <Toast.Body>Your edit was successful</Toast.Body>
        </Toast>
        <Modal.Title id="contained-modal-title-vcenter">Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Company name</Form.Label>
          <Form.Control
            type="text"
            value={companyName}
            onChange={(e) => {
              const { value } = e.target;
              setComapanyname(value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => {
              const { value } = e.target;
              setTitle(value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={body}
            onChange={(e) => {
              const { value } = e.target;
              setBody(value);
            }}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPostModal;
