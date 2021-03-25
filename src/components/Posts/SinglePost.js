import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Toast,
} from "react-bootstrap";
import axios from "axios";
import { userListSelectors, commentsSelectors } from "../../store";
import { useSelector } from "react-redux";
import placeholderImg from "../../assets/dummy-user.jpg";
import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteComment";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";

export const SinglePost = () => {
  const urlParams = useParams();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const [comment, setComment] = useState("");
  const [addComment, setAddComment] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [post, setPost] = useState();

  const { selectAllUsers } = userListSelectors;
  const { selectCommentStatus, selectAllComments } = commentsSelectors;
  const users = useSelector(selectAllUsers);
  const commentStatus = useSelector(selectCommentStatus);
  const comments = useSelector(selectAllComments);

  const postId = urlParams.postId;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`)
      .then((response) => {
        console.log(response.data.data);
        const [postResponse] = response.data.data;

        setPost(response.data.data);
        console.log(postResponse);
      });
  }, [postId]);

  const token = JSON.parse(sessionStorage.getItem("user_payload")).token;

  const createComment = () => {
    const data = {
      comment: comment,
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/comments/${postId}/create`,
        data,
        {
          headers: {
            token: `${token}`,
          },
        }
      )
      .then((response) => {
        if ([200, 201].includes(response.status)) {
          setShowToast(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (
    commentStatus === "loading" ||
    commentStatus === "idle" ||
    post === undefined
  ) {
    return (
      <div className="o-app__loader">
        <Loader active inline="centered" />
      </div>
    );
  }

  const [postData] = post;
  const [user] = users.data.filter((user) => {
    return user.id === postData.user_id;
  });

  console.log(postData);
  const postComments = comments.data.data.filter((comment) => {
    return comment.post_id === postId;
  });
  return (
    <>
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8} lg={8} sm={12} xs={12}>
            <h1>{postData.title}</h1>
            <div className="single__postWrapper">
              <div className="postWrapper my-3">
                <div className="avatar  py-4">
                  <Image
                    src={
                      postData.image_url !== ""
                        ? postData.image_url
                        : placeholderImg
                    }
                    roundedCircle
                  />
                </div>
                <div className="postInfoCol  py-4">
                  <div className="username">
                    <h4>{user.username}</h4>
                    <p>{new Date(postData.createdat).toDateString()}</p>
                  </div>
                  <div className="post-details">
                    <h4>{postData.postTitle}</h4>
                    <div className="tags">
                      Tag:{" "}
                      {postData.tags.map((tag) => (
                        <p>{tag}</p>
                      ))}
                    </div>
                    <p className="post">{postData.post}</p>
                  </div>
                  <div className="post-actions-wrapper">
                    <p className="comments">{`${postComments.length} comment`}</p>
                    <p>Edit</p>
                    <p>Delete</p>
                  </div>

                  {/* Toast message */}

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
                      <strong className="mr-auto">Comment created</strong>
                    </Toast.Header>
                    <Toast.Body>
                      Comment has been created successfully
                    </Toast.Body>
                  </Toast>

                  {/* +++++++++++++++++ Add coment section */}
                  <div className="comments">
                    <div className="comment-wrapper">
                      {/* Comment to be mapped */}

                      {postComments?.map((comment) => {
                        const [user] = users.data.filter((user) => {
                          return user.id === comment.user_id;
                        });
                        return (
                          <div className="postWrapper my-3">
                            <div className="avatar  py-4">
                              <Image src={placeholderImg} roundedCircle />
                            </div>
                            <div className="postInfoCol  py-4">
                              <div className="username">
                                <h4>{user.username}</h4>
                                <p>
                                  {new Date(comment.createdat).toDateString()}
                                </p>
                              </div>
                              <div className="post-details">
                                <p className="post">{comment.comment}</p>
                              </div>
                              <EditCommentModal
                                show={editModal}
                                onHide={() => setEditModal(false)}
                                commentId={selectedComment}
                              />
                              <DeleteCommentModal
                                show={deleteModal}
                                onHide={() => setDeleteModal(false)}
                                commentId={selectedComment}
                              />
                              <div className="post-actions-wrapper">
                                <p
                                  onClick={() => {
                                    setEditModal(true);
                                    setSelectedComment(comment.id);
                                  }}
                                >
                                  Edit
                                </p>
                                <p
                                  onClick={() => {
                                    setDeleteModal(true);
                                    setSelectedComment(comment.id);
                                  }}
                                >
                                  Delete
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Comment ends */}
                    </div>
                  </div>

                  {/* Add comment form */}
                  {addComment === false && (
                    <p
                      className="add-comment"
                      onClick={() => {
                        setAddComment(true);
                      }}
                    >
                      Add comment
                    </p>
                  )}

                  {addComment && (
                    <div>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label></Form.Label>
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
                      <Button
                        style={{ float: "right" }}
                        variant="primary"
                        onClick={createComment}
                      >
                        Save
                      </Button>
                    </div>
                  )}

                  {/* ============End comment section==== */}
                </div>
              </div>
            </div>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </>
  );
};
