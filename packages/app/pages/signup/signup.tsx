/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-var */

import { ReactElement, useEffect } from "react";
import Router from "next/router";
import "./styles.css";
import { useState } from "react";
import Select from "react-select";
import { message } from "antd";
// eslint-disable-next-line @typescript-eslint/ban-types

export default function Signup(): ReactElement {
  var ErrorFetchedChecker = false;
  //get course
  const [courses, setCourses] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ value: 0, label: "" });

  function handleSelect(data) {
    setSelectedOption(data);
  }

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const getOptions = {
      method: "GET",
    };
    fetch("/api/v1/courses", getOptions).then(async (response) => {
      const data = await response.json();
      let course = [];
      for (var i = 0; i < data.length; i++) {
        course.push({ value: data[i].id, label: data[i].name });
      }
      setCourses(course);
    });
  }, [ErrorFetchedChecker]);
  //send data to create user
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const inputdata = {
      email: event.target.email.value,
      password: event.target.password.value,
      confirm: event.target.confirmPassword.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      sid: event.target.sid.value,
    };
    if (inputdata.password !== inputdata.confirm) {
      alert("passwords don't match, try again");
      return;
    }
    const loginRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputdata.email,
        password: inputdata.password,
        first_name: inputdata.firstName,
        last_name: inputdata.lastName,
        sid: parseInt(inputdata.sid),
        selected_course: selectedOption.value,
      }),
    };
    fetch("/api/v1/signup/ubc_signup", loginRequest)
      .then(async (response) => {
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const data = await response.json();
          message.error(data.message);
        } else {
          message.success("Registered successfully! ");
          Router.push("../login");
        }
      })
      .catch((_) => {
        message.error("There was an error.");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <h1>UBC office hour sign up</h1>
        <div className="form-body">
          <div className="firstName">
            <label className="form__label" htmlFor="firstName">
              {" "}
              First Name{" "}
            </label>
            <input
              name="firstName"
              type="text"
              id="firstName"
              className="form__input"
              required
            />
          </div>
          <div className="lastName">
            <label className="form__label" htmlFor="firstName">
              {" "}
              Last Name{" "}
            </label>
            <input
              name="lastName"
              type="text"
              id="lastName"
              className="form__input"
              required
            />
          </div>
          <div className="sid">
            <label className="form__label"> Student ID </label>
            <input name="sid" type="number" required />
          </div>
          <div className="email">
            <label className="form__label" htmlFor="email">
              {" "}
              Email{" "}
            </label>
            <input
              name="email"
              type="text"
              id="email"
              className="form__input"
              required
            />
          </div>
          <div className="password">
            <label className="form__label" htmlFor="password">
              Password{" "}
            </label>
            <input
              className="form__input"
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="confirm-password">
            <label className="form__label" htmlFor="confirmPassword">
              Confirm Password{" "}
            </label>
            <input
              className="form__input"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              required
            />
          </div>
          Choose your courses
          <div className="dropdown-container">
            <Select
              options={courses}
              placeholder="Select courses"
              value={selectedOption}
              onChange={handleSelect}
              isSearchable={true}
            />
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn">
            Register
          </button>
        </div>
        <div>
          <a href="../login">log in</a>
        </div>
        <div className="app"></div>
      </form>
    </div>
  );
}
