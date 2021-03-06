import React from "react";
import BusinessImg from "../../assets/business-man.png";
import IconElipse from "../../assets/elipse-icon.png";
import ellipse1 from "../../assets/elip-1.png";
import ellipse2 from "../../assets/elip-2.png";
import ellipse3 from "../../assets/elip-3.png";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Home = () => {
  const values = [
    {
      image: ellipse1,
      header: "Check through available posts",
      text:
        "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      image: ellipse2,
      header: "Search from a list of companies",
      text:
        "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
    {
      image: ellipse3,
      header: "Post your job experience",
      text:
        "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    },
  ];

  const history = useHistory();
  return (
    <div>
      <div className="top-head">
        <div className="top-row">{/* <TopNavbar /> */}</div>
      </div>
      <div className="main-head">
        <div className="container">
          <div className="row">
            <div className="text text-left">
              <h2>Verify Jobs and Interviews</h2>
              <p style={{ fontWeight: "100" }}>
                Getting a job interview is good, getting
                <br></br>
                scammed while at it is not. Check and verify
                <br />
                before you move.
              </p>
              <div className="action-btn">
                <button
                  onClick={() => {
                    history.push("/posts");
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="fairly-section">
        <Container>
          <Row>
            <div className="col-md-6 fairly-left-col">
              <img src={BusinessImg} alt="img" />
            </div>
            <div className="col-md-6 fairly-right-col">
              <div className="contentWrapper">
                <div className="icon-top">
                  <img src={IconElipse} alt="icon" />
                </div>
                <div className="fairly-right-header">
                  <h2>
                    We make it fiarly easy for you to verify job interviews
                  </h2>
                  <p>
                    We have a social network that allows people to post their
                    job search and interview experiences adding the company’s
                    name and address to help other job seekers properly navigate
                    their job search and help make wise decisions
                  </p>
                </div>
              </div>
            </div>
          </Row>
        </Container>
        <div className="value-section">
          <Container>
            <Row>
              {values.map((value) => {
                return (
                  <Col
                    key={values.indexOf(value)}
                    md={4}
                    xs={12}
                    sm={12}
                    lg={4}
                  >
                    <div className="wrapper">
                      <div className={`box-header -a${values.indexOf(value)}`}>
                        <img src={value.image} alt="" />
                      </div>
                      <div className="header">
                        <h3>{value.header}</h3>
                      </div>
                      <div className="text">{value.text}</div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </section>
      <section className="subscribe">
        <Container></Container>
      </section>
    </div>
  );
};

export default Home;
