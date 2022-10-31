// import { Button } from "antd";
// import styled from "styled-components";
import { ReactElement } from "react";
// import { useHomePageRedirect } from "../hooks/useHomePageRedirect";
// import { User } from "@koh/common";
import Router from "next/router";
// import { useProfile } from "../hooks/useProfile";
import { useState } from "react";
import "./signup/styles.css";
import { message } from "antd";
// import { useRouter } from "next/router";

export default function Login(): ReactElement {
  // const profile: User = useProfile();
  // const didRedirect = useHomePageRedirect();
  // if (profile && !didRedirect) {
  //   Router.push("/nocourses");
  // }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function login() {
    const loginRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch("/api/v1/ubc_login", loginRequest)
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          if (data.message === "Invalid credential") {
            message.error("Invalid password.");
          } else {
            message.error("User Not Found");
          }
          return Promise.reject(error);
        } else {
          Router.push(`/api/v1/login/entry?token=${data.token}`);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  //put token inside login request
  const handleSubmit = (event: any) => {
    event.preventDefault();
    login();
  };
  return (
    <div>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <form onSubmit={handleSubmit} className="form">
        <h1>Log into UBC office hours</h1>
        <div className="form-body">
          <div className="email">
            <label className="form__label" htmlFor="email">
              Email{" "}
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              id="email"
              className="form__input"
              placeholder="Email"
            />
          </div>
          <div className="password">
            <label className="form__label" htmlFor="password">
              Password{" "}
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form__input"
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
        <button>
          <a href="./signup/signup">Register</a>
        </button>
      </form>
      <div></div>
    </div>
  );
}
