import { Button, Form, Input, Select, Col, Row, Card, message } from "antd";
import { useState } from "react";
import Img from "../fon.png";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "store/slices/userSlice";
import { createOrder } from "http/orderApi";

const { TextArea } = Input;

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [val, setVal] = useState("");

  const onFinish = (values) => {
    if (user.id === null) {
      navigate("/login");
    } else {
      let order = values;
      order.status = "В обработке";
      createOrder(order, user.id);
      setVal("");
      message.success("Завка успешно отправлена!");
    }
  };

  return (
    <div style={{ height: "100vh", backgroundImage: `url(${Img})` }}>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Button type="dashed" style={{ margin: 10 }}>
          <Link to="/orders">Все заявки</Link>
        </Button>
        <Button
          type="default"
          style={{ margin: 10 }}
          onClick={() => dispatch(removeUser())}
        >
          <Link to="/">Выйти</Link>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Card title="Оставьте заявку" style={{ width: "60%" }}>
          <Form
            name="order"
            wrapperCol={{ span: 60 }}
            layout="vertical"
            style={{
              maxWidth: 800,
            }}
            onFinish={onFinish}
          >
            <Row style={{ marginTop: 20 }}>
              <Col span={10}>
                <Form.Item name="theme" label="Тема:" initialValue={val}>
                  <Input />
                </Form.Item>

                <Form.Item label="Описание:" name="discription" value={val}>
                  <TextArea rows={5} />
                </Form.Item>
              </Col>
              <Col span={10} offset={4}>
                <Form.Item label="Телефон (123-456):" name="phone" value={val}>
                  <Input
                    placeholder="123-456"
                    type="tel"
                    required
                    pattern="[0-9]{3}-[0-9]{3}"
                  />
                </Form.Item>
                <Form.Item
                  label="Приоритетность задачи:"
                  name="important"
                  value={val}
                >
                  <Select>
                    <Select.Option value="Очень важно">
                      Очень важно
                    </Select.Option>
                    <Select.Option value="Важно">Важно</Select.Option>
                    <Select.Option value="Не требует срочности">
                      Не требует срочности
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Корпус:" name="place" value={val}>
                  <Select>
                    <Select.Option value="302/303к.">302/303к.</Select.Option>
                    <Select.Option value="Инженерный корпус">
                      Инженерный корпус
                    </Select.Option>
                    <Select.Option value="305к.">305к.</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Отправить
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </div>
  );
};
// eslint-disable-next-line import/no-anonymous-default-export
export default () => <HomePage />;
