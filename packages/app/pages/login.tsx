import Router from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { message, Button, Form, Input, Select, Spin, Modal } from "antd";
//import Select from "react-select";
import styled from "styled-components";
import { API } from "@koh/api-client";

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 300px;
  padding-top: 100px;
`;
class option {
  value: number;
  label: string;
}
export default function Login(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState(null);
  const [cOptions, setCOptions] = useState<option[]>(null);
  const [selectedCourse, setSelectedCourse] = useState<number>(null);
  useEffect(() => {
    getCourses();
    if (cOptions) {
      setSelectedCourse(cOptions[0].value);
    }
  }, []);
  const getCourses = async () => {
    await API.course.getAllCourses().then((courses) => {
      if (!courses) {
        message.warning("courses not found");
        return;
      }
      const CourseOptions = courses.map((course) => ({
        value: course.id,
        label: course.name,
      }));
      setCOptions(CourseOptions);
    });
  };
  function onChange(value: number) {
    setSelectedCourse(value);
  }
  function submit(values: any) {
    // get all course ids with userid
    // if courseids.length==1 log in using login(values, course), if not stop. >2 then set modal to true.
    // modal calls modalSubmit that sends info to login to login.
    setLoginInfo(values);
    const courses = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.username,
        password: values.password,
      }),
    };
    fetch(`/api/v1/getAllcourses`, courses)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          if (data.message === "Invalid credential") {
            message.error("Invalid password.");
          } else if (data.message === "NotInCourse") {
            message.error("Not registered in selected course");
          } else {
            message.error("User Not Found");
          }
          return Promise.reject(error);
        } else {
          if (data.length == 1) {
            login(data[0].courseId);
          } else if (data.length > 1) {
            setIsModalOpen(true);
          }
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  const handleOk = () => {
    setIsModalOpen(false);
    login(selectedCourse);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function login(course: number) {
    const loginRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginInfo.username,
        password: loginInfo.password,
      }),
    };
    fetch(`/api/v1/ubc_login/${course}`, loginRequest)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          if (data.message === "Invalid credential") {
            message.error("Invalid password.");
          } else if (data.message === "NotInCourse") {
            message.error("Not registered in selected course");
          } else {
            message.error("User Not Found");
          }
          return Promise.reject(error);
        } else {
          Router.push(`/api/v1/login/entry/${course}?token=${data.token}`);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  //put token inside login request
  if (!cOptions) {
    return <Spin tip="Loading..." size="large" />;
  } else {
    return (
      <Container>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={submit}
        >
          <h1>UBC HelpMe</h1>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <a
              style={{ float: "right", marginTop: "-10px" }}
              href="./forgetpassword/forget"
            >
              Forgot password
            </a>
          </Form.Item>

          <Form.Item style={{ marginTop: "-15px" }}>
            <Button
              style={{ width: "100%", marginTop: "-15px" }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="./signup/signup">register now!</a>
          </Form.Item>
        </Form>
        <Modal
          title="Basic Modal"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Select
            placeholder="Select course"
            onChange={onChange}
            options={cOptions}
            defaultValue={selectedCourse}
          />
        </Modal>
      </Container>
    );
  }
}
