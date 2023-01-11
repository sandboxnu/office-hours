import Router from "next/router";
import { ReactElement } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { message, Button, Form, Input } from "antd";
//import Select from "react-select";
import styled from "styled-components";

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 300px;
  padding-top: 100px;
`;

export default function Login(): ReactElement {
  // const [courses, setCourses] = useState([]);
  // const [courseId, setId] = useState([]);
  // const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  // useEffect(() => {
  //   // POST request using fetch inside useEffect React hook
  //   const getOptions = {
  //     method: "GET",
  //   };
  //   fetch("/api/v1/courses", getOptions).then(async (response) => {
  //     const data = await response.json();
  //     const courseNames = [];
  //     for (let i = 0; i < data.length; i++) {
  //       courseNames.push(data[i].name);
  //       courseId.push(data[i].id);
  //     }
  //     setId(courseNames);
  //     setCourses(courseNames);
  //   });
  // }, []);

  function login(values: any) {
    const loginRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.username,
        password: values.password,
      }),
    };
    fetch("/api/v1/ubc_login", loginRequest)
      .then(async (response) => {
        const data = await response.json();
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

  return (
    <Container>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={login}
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
    </Container>
  );
}
