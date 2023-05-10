import { Card, Button, Col, Row, Select, Tag } from "antd";
import { useState, useEffect } from "react";
import Img from "../fon.png";
import { useNavigate, Link, useLoaderData, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "store/slices/userSlice";
import { fetchOneOrder, changeStatus } from "http/orderApi";
import { check } from "http/userApi";
import { toDate } from "helpers/dateTime";

export async function loader({ params }) {
  const order = await fetchOneOrder(params.id);
  return { order };
}

const OneOrderPage = () => {
  const user = useSelector((store) => store.user);
  let order = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("В обработке");
  order = order.order;

  useEffect(() => {
    if (user.id === null) {
      check().then((data) => {
        dispatch(
          setUser({
            email: data.email,
            id: data.id,
            token: data.acsessToken,
            role: data.role,
          })
        );
      });
    }
  }, []);

  const editStatus = () => {
    changeStatus(status, order.id, user.id);
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
        {user.role === "EXECUTOR" ? (
          <>
            <Button type="dashed" style={{ margin: 10 }}>
              <Link to="/all_orders">Все заявки</Link>
            </Button>
            <Button type="dashed" style={{ margin: 10 }}>
              <Link to="/orders">Мои заявки</Link>
            </Button>
          </>
        ) : (
          <Button type="dashed" style={{ margin: 10 }}>
            <Link to="/orders">Все заявки</Link>
          </Button>
        )}
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
        }}
      >
        <Card
          title={`Заявка №${order.id}`}
          style={{ width: "80%", marginTop: 30, height: "80vh" }}
          extra={<p>от {toDate(order.createdAt)}</p>}
        >
          <Row>
            <Col span={10}>
              <div>
                <h2>Тема:</h2>
                <p>{order.theme}</p>
              </div>
              <div>
                <h2>Описание:</h2>
                <p>{order.discription}</p>
              </div>
              <div>
                <h2>Важность:</h2>
                <p>{order.important}</p>
              </div>
              <div>
                <h2>Место:</h2>
                <p>{order.place}</p>
              </div>
            </Col>
            <Col span={10} offset={4}>
              <div>
                <h2>Телефон:</h2>
                <p>{order.phone}</p>
              </div>
              <div>
                <h2>Заказчик:</h2>
                <p>
                  Email:{" "}
                  <a href="https://mail.ru" target="_blank">
                    {order.customer_order.user.email}
                  </a>
                </p>
                <p>Имя: {order.customer_order.user.full_name}</p>
              </div>
              <div>
                <h2>Исполнитель:</h2>

                {order.executorOrderId === null ? (
                  <p>Эта заявка еще не принята специалистом</p>
                ) : (
                  <>
                    <p>
                      Email:{" "}
                      <a href="https://mail.ru" target="_blank">
                        {order.executor_order.user.email}
                      </a>
                    </p>
                    <p>Имя: {order.executor_order.user.full_name}</p>
                  </>
                )}
              </div>
              <div>
                <h2>Статус:</h2>
                {user.role === "EXECUTOR" ? (
                  <>
                    <Select
                      defaultValue={order.status}
                      onChange={(value) => setStatus(value)}
                      style={{ width: 180 }}
                    >
                      <Select.Option value="В обработке">
                        В обработке
                      </Select.Option>
                      <Select.Option value="Принято в работу">
                        Принято в работу
                      </Select.Option>
                      <Select.Option value="Готово">Готово</Select.Option>
                    </Select>
                    <br />
                    <br />
                    <br />
                    <Button type="primary" onClick={editStatus()}>
                      <NavLink to="/orders">Сохранить</NavLink>
                    </Button>
                  </>
                ) : (
                  <p>
                    {order.status === "В обработке" ? (
                      <Tag color="#1F51FF" key={order.status}>
                        {order.status}
                      </Tag>
                    ) : order.status === "Готово" ? (
                      <Tag color="#4CBB17" key={order.status}>
                        {order.status}
                      </Tag>
                    ) : (
                      <Tag color="#f50" key={order.status}>
                        {order.status}
                      </Tag>
                    )}
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default () => <OneOrderPage />;
