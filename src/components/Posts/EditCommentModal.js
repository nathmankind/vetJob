import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Toast, Spinner } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { commentsSelectors } from "../../store";

const EditCommentModal = (props) => {
  const [comment, setComment] = useState();
  const [showToast, setShowToast] = useState(false);

  const base_url = process.env.REACT_APP_BACKEND_URL;
  const user_payload = JSON.parse(sessionStorage.getItem("user_payload"));

  const { selectCommentStatus, selectAllComments } = commentsSelectors;

  const commentStatus = useSelector(selectCommentStatus);
  const comments = useSelector(selectAllComments);

  useEffect(() => {
    if (props.show === true && user_payload !== null) {
      console.log("i'm in here");
      const data = comments.data.data.find((comment) => {
        return comment.id === props.commentId;
      });
      setComment(data.comment);
    }
  }, []);
  if (commentStatus === "loading" || commentStatus === "idle") {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  const handleEditSubmit = () => {
    const data = {
      comment: comment,
    };

    axios
      .put(`${base_url}/comments/${props.commentId}`, data, {
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
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => {
              const { value } = e.target;
              setComment(value);
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

export default EditCommentModal;
