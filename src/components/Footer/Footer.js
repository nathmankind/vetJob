import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/logo-white.png";

export const Footer = () => {
  const links = [
    {
      linkText: "Feeds",
      url: "/feeds",
    },
    {
      linkText: "Job Posts",
      url: "/careers",
    },
    {
      linkText: "Contact Us",
      url: "/contact-us",
    },
  ];
  const socialLinks = [
    {
      platform: "Facebook",
      url: "https://facebook.com",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com",
    },
  ];
  return (
    <>
      <section className="footer-section">
        <Container>
          <Row>
            <Col md={4} lg={4} xs={12} sm={12}>
              <div className="logo">
                <img src={logo} alt="logo" />
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Assumenda deserunt fuga qui accusantium atque itaque.
                </p>
              </div>
            </Col>
            <Col md={4} lg={4} xs={12} sm={12}>
              <h3>Quick Links</h3>
              {links.map((link) => {
                return <p className="link">{link.linkText}</p>;
              })}
            </Col>
            <Col md={4} lg={4} xs={12} sm={12}>
              <h3>Follow Us</h3>
              {socialLinks.map((link) => {
                return <p className="link">{link.platform}</p>;
              })}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
