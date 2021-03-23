import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
import placeholderImg from "../../assets/dummy-user.jpg";

export const SinglePost = () => {
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
  ];
  return (
    <>
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8} lg={8} sm={12} xs={12}>
            <h1>Single post page view</h1>
            <div className="single__postWrapper">
              <div className="postWrapper my-3">
                <div className="avatar  py-4">
                  <Image src={posts[0].userImage} roundedCircle />
                </div>
                <div className="postInfoCol  py-4">
                  <div className="username">
                    <h4>{posts[0].username}</h4>
                    <p>{posts[0].createdAt.toDateString()}</p>
                  </div>
                  <div className="post-details">
                    <h4>{posts[0].postTitle}</h4>
                    <div className="tags">
                      Tag: <p>Scam</p> <p>GNLD</p>
                    </div>
                    <p className="post">{posts[0].post}</p>
                  </div>
                </div>
                <div className="post-actions-wrapper">
                  <div className="comments">22 comments</div>
                  <div className="actions">
                    <p>edit</p>
                    <p>view post</p>
                    <p>delete</p>
                  </div>
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
