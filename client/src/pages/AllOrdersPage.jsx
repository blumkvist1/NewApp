import { Card, Button, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import Img from "../fon.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "store/slices/userSlice";
import { fetchAllOrders } from "http/orderApi";
import { check } from "http/userApi";
import { toDate } from "helpers/dateTime";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (id) => <Link to={`/orders/${id}`}>{id}</Link>,
  },
  {
    title: "Тема",
    dataIndex: "theme",
    key: "theme",
    render: (text) => (
      <a style={{ color: "black", cursor: "default" }}>{text}</a>
    ),
  },
  {
    title: "Описание",
    dataIndex: "discription",
    key: "discription",
    render: (text) => {
      if (text.length > 100) {
        return (
          <a style={{ color: "black", cursor: "default" }}>
            {text.substr(0, 50)}...
          </a>
        );
      } else {
        return <a style={{ color: "black", cursor: "default" }}>{text}</a>;
      }
    },
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
  {
    title: "Дата создания",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => (
      <a style={{ color: "black", cursor: "default" }}>{toDate(text)}</a>
    ),
  },
  {
    title: "Исполнитель",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <Link to={`/orders/${record.id}`}>Взять в работу</Link>
    ),
  },
];

const AllOrdersPage = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
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
    } else {
      fetchAllOrders().then((data) => {
        setOrders(Object.values(data));
      });
    }
  }, [user]);

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
          <Link to="/orders">Мои заявки</Link>
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
          title="Все заявки"
          style={{ width: "80%", marginBottom: 5, height: "95vh" }}
        >
          <Table
            columns={columns}
            dataSource={orders}
            style={{ height: "80vh", width: "100%" }}
          />
        </Card>
      </div>
    </div>
  );
};

export default () => <AllOrdersPage />;
