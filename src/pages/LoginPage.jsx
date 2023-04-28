import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card } from "antd";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";

import { setUser } from "store/slices/userSlice";
import { useNavigate, redirect } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import Img from "../../src/fon.png";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogin = (email, password) => {
    console.log(email, password);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.acsessToken,
          })
        );
        navigate("/create_order");
      })
      .catch((e) => {
        alert("Error: " + e.message);
      });
  };

  const onFinish = () => {
    handleLogin(email, password);
  };
  return (
    <Content>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: `url(${Img})`,
        }}
      >
        <Card
          title={`Авторизация`}
          style={{
            textAlign: "center",
            height: "300px",
            width: "400px",
            marginTop: "100px",
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            size="middle"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Вы не ввели e-mail",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Ведите e-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Вы не ввели пароль",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Введите пароль"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button "
                >
                  Войти
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Content>
  );
};
export default LoginPage;
