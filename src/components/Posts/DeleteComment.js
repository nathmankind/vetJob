import React, { useState } from "react";
import { Modal, Button, Toast } from "react-bootstrap";
import axios from "axios";

const DeleteCommentModal = (props) => {
  const [showToast, setShowToast] = useState(false);

  const base_url = process.env.REACT_APP_BACKEND_URL;
  const token = JSON.parse(sessionStorage.getItem("user_payload")).token;

  const handleDelete = () => {
    axios
      .delete(`${base_url}/comments/${props.commentId}`, {
        headers: {
          token: `${token}`,
        },
      })
      .then(
        (response) => {
          if ([200, 201].includes(response.status)) {
            setTimeout(() => {
              setShowToast(true);
              window.location.reload();
            }, 5000);
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
            <strong className="mr-auto">Delete Successful</strong>
          </Toast.Header>
          <Toast.Body>Your delete was successful</Toast.Body>
        </Toast>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this post?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          No
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCommentModal;
