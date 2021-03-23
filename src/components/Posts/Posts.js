import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Image,
  Spinner,
} from "react-bootstrap";
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

export const Posts = () => {
  const history = useHistory();

  const { selectAllPosts } = postsSelectors;
  const { selectAllUsers } = userListSelectors;
  const { selectCommentStatus } = commentsSelectors;
  const allPosts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  const commentStatus = useSelector(selectCommentStatus);

  const [modalShow, setModalShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");

  if (commentStatus === "loading" || commentStatus === "idle") {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  const data = allPosts?.data.data;

  const posts = [
    {
      userImage: placeholderImg,
      username: "Jammie Vardy",
      createdAt: new Date(),
      tags: ["business", "marketting", "scam"],
      postTitle: "lorem ipsume ipsume dolor dolor dhsjjsjs",
      post:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus atque enim quae alias voluptas corporis consequatur incidunt omnis nesciunt vel, dolorum nobis fugit architecto aliquam ut ducimus iste maxime dolores?",
    },
    {
      userImage: placeholderImg,
      username: "Jammie Vardy",
      createdAt: new Date(),
      tags: ["business", "marketting", "scam"],
      postTitle: "lorem ipsume ipsume dolor dolor dhsjjsjs",
      post:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus atque enim quae alias voluptas corporis consequatur incidunt omnis nesciunt vel, dolorum nobis fugit architecto aliquam ut ducimus iste maxime dolores?",
    },
  ];
  return (
    <div>
      <section className="post-page-header">
        <Container>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="primary">Search</Button>
          </Form>
          <div className="create-post-btn">
            <Button
              variant="primary"
              onClick={() => {
                history.push("/posts/create");
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
                data.map((post) => {
                  const [postUser] = users.data.filter((user) => {
                    return user.id === post.user_id;
                  });
                  return (
                    <div key={posts.indexOf(post)} className="postWrapper my-3">
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
                          <h4>{`Company: ${post.company}`}</h4>
                          <h4> {post.title}</h4>
                          <div className="tags">
                            Tag:{" "}
                            {post.tags.map((tag) => (
                              <p>{tag}</p>
                            ))}
                          </div>
                          <p className="post">{post.post}</p>
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
                            className="comments"
                            onClick={() => {
                              history.push(`/posts/${post.id}`);
                            }}
                          >
                            22 comments
                          </p>
                          <p
                            onClick={() => {
                              setModalShow(true);
                              setSelectedPostId(post.id);
                            }}
                          >
                            edit
                          </p>
                          <p>view post</p>
                          <p
                            onClick={() => {
                              setDeleteModal(true);
                              setSelectedPostId(post.id);
                            }}
                          >
                            delete
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
