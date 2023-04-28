import { Card, Button, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import Img from "../../src/fon.png";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "store/slices/userSlice";

const columns = [
  {
    title: "Тема",
    dataIndex: "theme",
    key: "theme",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Описание",
    dataIndex: "discription",
    key: "discription",
    render: (text) => {
      if (text.length > 100) {
        return <a>{text.substr(0, 50)}...</a>;
      } else {
        return <a>{text}</a>;
      }
    },
  },
  {
    title: "ФИО",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Важность",
    key: "important",
    dataIndex: "important",
    render: (text) => {
      if (text === "Очень важно") {
        return (
          <Tag color="volcano" key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      } else if (text === "Важно") {
        return (
          <Tag color="geekblue" key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      } else {
        return (
          <Tag color="green" key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      }
    },
  },
  {
    title: "Корпус",
    dataIndex: "place",
    key: "place",
  },
];

const OrdersPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const db = getDatabase();

    const Data = ref(db, "orders/");
    onValue(Data, (snapshot) => {
      const data = snapshot.val();
      setOrders(Object.values(data));
      console.log(orders);
    });
  }, []);

  return (
    <div style={{ height: "100%", backgroundImage: `url(${Img})` }}>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Button type="dashed" style={{ margin: 10 }}>
          <Link to="/create_order">Создать заявку</Link>
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
          title="Мои заявки"
          style={{ width: "60%", marginBottom: 5, height: "95vh" }}
        >
          <Table
            columns={columns}
            dataSource={orders}
            style={{ height: "80vh" }}
          />
        </Card>
      </div>
    </div>
  );
};

export default () => <OrdersPage />;
