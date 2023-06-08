import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

import styled from "styled-components";

const EmailVerify = () => {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);

  const handleVerify = async () => {
    try {
      if (auth) {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB_6gzTaoLHwNICFncYZ4begFDtridK5HQ",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "VERIFY_EMAIL",
              idToken: token,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          alert("link sent");
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        onClick={handleVerify}
        className="py-0 btn btn btn-success"
        style={{ marginRight: "0.5rem" }}
      >
        Verify Email
      </Button>
    </div>
  );
};

export default EmailVerify;
