import React, { useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import placeholderImg from "../../assets/dummy-user.jpg";
import { useSelector } from "react-redux";
import {
  postsSelectors,
  userListSelectors,
  commentsSelectors,
} from "../../store";
import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePost";
import { nanoid } from "@reduxjs/toolkit";
import { Typeahead } from "react-bootstrap-typeahead";
import { Loader } from "semantic-ui-react";

export const Posts = () => {
  const history = useHistory();

  const { selectAllPosts } = postsSelectors;
  const { selectAllUsers, selectUsersStatus } = userListSelectors;
  const { selectCommentStatus, selectAllComments } = commentsSelectors;
  const allPosts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  const commentStatus = useSelector(selectCommentStatus);
  const userStatus = useSelector(selectUsersStatus);
  const comments = useSelector(selectAllComments);

  const [modalShow, setModalShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [singleSelections, setSingleSelections] = useState([]);

  if (
    commentStatus === "loading" ||
    commentStatus === "idle" ||
    userStatus === "idle" ||
    userStatus === "loading"
  ) {
    return (
      <div className="o-app__loader">
        <Loader active inline="centered" />
      </div>
    );
  }
  const data = allPosts?.data.data;

  const allCompanies = data?.map((data) => {
    return data.company;
  });

  const seen = new Set();
  const uniqueCompanies = allCompanies?.filter((company) => {
    const duplicate = seen.has(company);
    seen.add(company);
    return !duplicate;
  });

  const [selection] = singleSelections;
  const filteredPost = data?.filter((data) => {
    return data.company === selection;
  });

  const renderedPosts = () => {
    if (singleSelections.length === 0) {
      return data;
    } else {
      return filteredPost;
    }
  };
  const allAvailablePost = renderedPosts();

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + "....";
  }

  return (
    <div>
      <section className="post-page-header">
        <Container>
          <div className="search-header">
            <Typeahead
              id="basic-typeahead-single"
              labelKey="name"
              onChange={setSingleSelections}
              options={uniqueCompanies}
              placeholder="Choose a company..."
              selected={singleSelections}
            />

            <Button
              variant="primary"
              onClick={() => {
                if (sessionStorage.getItem("user_payload")) {
                  history.push("/posts/create");
                } else {
                  alert("You must be signed in to perfomr this action");
                }
              }}
            >
              Create Post
            </Button>
          </div>
        </Container>
      </section>
      <section className="posts-section">
        <Container>
          <Row>
            <Col md={2}></Col>
            <Col md={8} lg={8} sm={12} xs={12}>
              {data !== undefined &&
                allAvailablePost.map((post) => {
                  const [postUser] = users?.data.filter((user) => {
                    return user.id === post.user_id;
                  });
                  const postComments = comments.data.data.filter((comment) => {
                    return comment.post_id === post.id;
                  });
                  return (
                    <div key={nanoid()} className="postWrapper my-3">
                      <div className="avatar  py-4">
                        <Image
                          src={
                            postUser.image_url !== null
                              ? postUser.image_url
                              : placeholderImg
                          }
                          roundedCircle
                        />
                      </div>
                      <div className="postInfoCol  py-4">
                        <div className="username">
                          <h4>{postUser.username}</h4>
                          <p>{new Date(post.createdat).toDateString()}</p>
                        </div>
                        <div className="post-details">
                          <h4 className="companyName">{`Company: ${post.company}`}</h4>
                          <h4 className="post-title"> {post.title}</h4>
                          <div className="tags">
                            Tag:{" "}
                            {post.tags.map((tag) => (
                              <p>{tag}</p>
                            ))}
                          </div>
                          <p className="post">
                            {" "}
                            {truncateString(post.post, 200)}
                          </p>
                        </div>
                        <EditPostModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                          post_id={selectedPostId}
                        />
                        <DeletePostModal
                          show={deleteModal}
                          onHide={() => setDeleteModal(false)}
                          post_id={selectedPostId}
                        />
                        <div className="post-actions-wrapper">
                          <p
                            className="comments view_comment"
                            onClick={() => {
                              history.push(`/posts/${post.id}`);
                            }}
                          >
                            {`${postComments.length} comment`}
                          </p>
                          <p
                            onClick={() => {
                              setModalShow(true);
                              setSelectedPostId(post.id);
                            }}
                          >
                            Edit
                          </p>
                          <p
                            className="view_post"
                            onClick={() => {
                              history.push(`/posts/${post.id}`);
                            }}
                          >
                            View Post
                          </p>
                          <p
                            onClick={() => {
                              setDeleteModal(true);
                              setSelectedPostId(post.id);
                            }}
                          >
                            Delete
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Col>
            <Col md={2}></Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};
