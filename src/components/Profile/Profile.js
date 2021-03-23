import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import placeholderImg from "../../assets/dummy-user.jpg";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: false,
      name: "",
      email: "",
      image: "",
      userType: "",
      userId: null,
      selectedFile: null,
      uploadedImg: "",
      uploadProgress: "",
    };
  }

  componentDidMount() {
    let data = JSON.parse(sessionStorage.getItem("userData"));
    data
      ? this.setState({
          isUserLoggedIn: true,
          name: data.name,
          email: data.email,
          userType: data.userType,
          userId: data.id,
          image: data.profileImg,
        })
      : this.setState({ isUserLoggedIn: false, name: "" });
  }

  fileSelectedHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
    console.log(e.target.files[0]);
  };

  fileUploadHandler = (e) => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    fileData.append("upload_preset", "j6ph0b2u");
    console.log(fileData);
    console.log(this.state.selectedFile);
    const APIURL = "https://api.cloudinary.com/v1_1/nath/image/upload";
    axios
      .post(APIURL, fileData, {
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload progress: " +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%"
          );
          this.setState({
            uploadProgress:
              "Upload progress: " +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%",
          });
        },
      })
      .then((result) => {
        const img_url = result.data.secure_url;

        this.setState({
          image: result.data.secure_url,
          uploadedImg: result.data.secure_url,
        });
        fetch(
          `http://udemy-clone-json-server.herokuapp.com/signup_users/${this.state.userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profileImg: img_url,
            }),
          }
        );
        console.log(img_url);
      });
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <div className="header">
              <h3>User Profile</h3>
            </div>
          </Row>
          <Row>
            <Col md={9} lg={9} sm={12} xs={12} className="profileWrapper">
              <div className="col-md-4 profile-image-section">
                <Form>
                  <Image src={placeholderImg} roundedCircle />
                  <Form.File id="formcheck-api-regular">
                    <Form.File.Input
                      accept="image/png, image/jpeg"
                      onChange={this.fileSelectedHandler}
                    />
                  </Form.File>
                  <Button variant="primary" onClick={this.fileUploadHandler}>
                    Upload
                  </Button>
                  <p>{this.state.uploadProgress}</p>
                </Form>
              </div>
              <div className="col-md-8 user-profile-inputs">
                <Form>
                  <Form.Group controlId="formGroupFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group controlId="formGroupLastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" />
                  </Form.Group>
                  <Form.Group controlId="formGroupUsername">
                    <Form.Label>Preferred Username</Form.Label>
                    <Form.Control type="text" placeholder="zenon" />
                  </Form.Group>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Button variant="primary" onClick={this.fileUploadHandler}>
                    Edit Profile
                  </Button>
                </Form>
              </div>
            </Col>
            {/* <Col md={2} lg={2} sm={12} xs={12}></Col> */}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Profile;
