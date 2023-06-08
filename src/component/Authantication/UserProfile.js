import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { BsGithub } from "react-icons/bs";

import { useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);

  const name = useRef();
  const ImageUrl = useRef();

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    displayName: "",
    photoUrl: "",
  });

  useEffect(() => {
    name.current.value = userData.displayName;
    ImageUrl.current.value = userData.photoUrl;
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredname = name.current.value;
    const enteredImageUrl = ImageUrl.current.value;
    if (auth) {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB_6gzTaoLHwNICFncYZ4begFDtridK5HQ",

          {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
              displayName: enteredname,
              photoUrl: enteredImageUrl,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsLoading(false);
        if (res.ok) {
          name.current.value = "";
          ImageUrl.current.value = "";
          const data = await res.json();

          alert("updated");
          console.log(data);
          navigate("/expense");
        } else {
          const data = await res.json();
          throw data.error;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB_6gzTaoLHwNICFncYZ4begFDtridK5HQ",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setUserData({
          displayName: data.users[0].displayName,
          photoUrl: data.users[0].photoUrl,
        });
      }
    };
    fetchdata();
  }, []);
  return (
    <>
      <p style={{ float: "left", margin: "1rem", fontWeight: "bold" }}>
        Winners never quite.Quitters never win.
      </p>
      <p style={{ float: "right", margin: "1rem", fontWeight: "bold" }}>
        Your profile is 64% completed.A complete profile has
        <br /> higher chances of landing a job.
      </p>
      <hr style={{ width: "100%" }}></hr>
      <Container className="p-3 card">
        <Row>
          <Col xs="12" sm="8">
            <h3> Contact Details :</h3>
          </Col>
          <Col xs="12" sm="4" className="text-right">
            <Link to="/expense">
              <Button color="dark" style={{ float: "right" }}>
                Cancel
              </Button>
            </Link>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col xs="6" sm="6">
              <FormGroup>
                <Label>
                  <BsGithub style={{ fontSize: "20px", marginRight: "10px" }} />
                  Full Name:
                </Label>
                <Input type="text" innerRef={name} />
              </FormGroup>
            </Col>
            <Col xs="6" sm="6">
              <FormGroup>
                <Label>Image URL</Label>
                <Input type="text" innerRef={ImageUrl} />
              </FormGroup>
            </Col>
          </Row>
          {!isLoading && (
            <Button type="submit" color="dark" onClick={submitHandler}>
              Update
            </Button>
          )}
          {isLoading && <p>Sending request...</p>}
        </Form>
      </Container>
    </>
  );
};

export default UserProfile;
