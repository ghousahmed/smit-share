import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import ThemeButton from "./Button";
import { useTheme } from "../context/ThemeContext";
import useScreenWidth from "../helper/screenWidth";
import { Link } from "react-router-dom";
import "../mediaquery/mediaquery.scss";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const LoginForm = ({ loginUser }) => {
  const [clientReady, setClientReady] = useState(false);
  const [form] = Form.useForm();
  const { isDark, toggleTheme } = useTheme();
  useEffect(() => {
    isDark
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [isDark]);

  return (
    <div className={`d-flex ${isDark ? "dark-light" : ""}`}>
      <Form
        name="trigger"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          marginTop: "50px",
          backgroundColor: isDark ? "#2d2d30" : "#fff",
          color: isDark ? "#fff" : "",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={loginUser}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
       <Form.Item
          label={<span className={isDark ? "dark-light" : ""}>Email</span>}
          name="email"
          validateTrigger="onBlur"
          className={isDark ? "dark-light" : ""}
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Enter valid email address",
            },
          ]}

        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter your email"
            className={`input-border ${isDark ? "dark-lighter" : ""} ${isDark ? "white-placeholder" : ""}`}

          />
        </Form.Item>

        <Form.Item
          label={<span className={isDark ? "dark-light" : ""}>Password</span>}
          name="password"
          className={isDark ? "dark-light" : ""}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
              message: "Password must be greater than 6 charachter",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Enter your password "
            className={`input-border ${isDark ? "dark-lighter" : ""} ${isDark ? "white-placeholder" : ""}`}

          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          className={isDark ? "dark-light" : ""}
        >
          <Checkbox className={isDark ? "dark-light" : ""}>
            {" "}
            Remember me
          </Checkbox>
        </Form.Item>
        <Form.Item
          className={isDark ? "dark-light" : ""}
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <ThemeButton title={"Log In"} />
        </Form.Item>

        <Form.Item
          style={{
            backgroundColor: isDark ? "#2d2d30" : "",
            color: isDark ? "#ffff" : "",
          }}
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <span className="text">Don't have an account?</span>
          <span>
            {" "}
            <Link className="text-primary" to={"/signup"}>
              Sign Up
            </Link>{" "}
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
