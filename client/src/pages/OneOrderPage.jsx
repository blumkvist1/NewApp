import { Card, Button, Col, Row } from "antd";
import { useState, useEffect } from "react";
import Img from "../fon.png";
import { useNavigate, Link, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "store/slices/userSlice";
import { fetchOneOrder } from "http/orderApi";
import { toDate } from "helpers/dateTime";

export async function loader({ params }) {
  const order = await fetchOneOrder(params.id);
  return { order };
}

const OneOrderPage = () => {
  const user = useSelector((store) => store.user);
  let order = useLoaderData();
  const dispatch = useDispatch();
  order = order.order;
  console.log(order);

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
                <h2>Исполнитель:</h2>
                <p>
                  {order.executorOrderId === null
                    ? "Эта заявка еще не принята специалистом"
                    : order.executorOrderId}
                </p>
              </div>
              <div>
                <h2>Статус:</h2>
                <p>{order.status}</p>
              </div>
            </Col>
          </Row>
          {/* <div>
            <h2>Тема</h2>
            <p>{order.theme}</p>
          </div>
          <div>
            <h2>Описание</h2>
            <p>{order.discription}</p>
          </div>
			 <div>
            <h2>Важность</h2>
            <p>{order.important}</p>
          </div>
			 <div>
            <h2>Место</h2>
            <p>{order.discription}</p>
          </div>
			 <div>
            <h2>Телефон</h2>
            <p>{order.discription}</p>
          </div>
			 <div>
            <h2>Исполнитель</h2>
            <p>{order.discription}</p>
          </div> */}
        </Card>
      </div>
    </div>
  );
};

export default () => <OneOrderPage />;
