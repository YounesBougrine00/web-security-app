import React, { useEffect, useState,useLayoutEffect } from "react";
import InputGroup from "../components/InputGroup";
import OrderRow from "../components/OrderRow";
import axios from "axios";
import Header from "../components/Header";
import ClientImg from "../asstets/images/order.png";

function Orders() {
  const [orders, setOrders] = useState();
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("id");

  /* delete */
  const OnDelete = (id) => {
    if (window.confirm(`are you sure to delete this order`)) {
      axios.delete(`http://localhost:3001/orders/${id}`).then((res) => {
        getOrders();
      });
    }
  };

  /* find all orders */
  const getOrders = async () => {
    await axios.get("http://localhost:3001/orders").then((res) => {
      console.log(res);
      setOrders(res.data);
    });
  };
  useEffect(async () => {
    getOrders();
  }, []);

  return (
    <>
      <Header />
      <img alt="order" style={{ width: "100%" }} src={ClientImg}></img>
      {orders?.length !== 0 ? (
        <div
          style={{ textAlign: "center", width: "60%", margin: "auto" }}
          className="row p-4"
        >
          <div>
            <div style={{ width: "70%", float: "left" }}>
              <InputGroup
                label="Search"
                type="text"
                name="search"
                onChangeHandler={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div style={{ marginLeft: "10px", width: "20%", float: "left" }}>
              <label htmlFor="Email" className="form-label">
                Search by
              </label>
              <select
                value={searchBy}
                onChange={(e) => {
                  setSearchBy(e.target.value);
                  console.log(searchBy);
                }}
                className="form-control"
              >
                <option value="id">ID</option>
                <option value="clientid">Client ID</option>
              </select>
            </div>
          </div>
          <div className="mt-3 col-12 col-lg-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Client ID</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Order Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  ?.filter((order) => {
                    const { id, clientId, date } = order;
                    if (search === "") {
                      return order;
                    } else if (
                      searchBy === "id" &&
                      id.toString().includes(search)
                    ) {
                      return order;
                    } else if (
                      searchBy === "clientid" &&
                      clientId.toString().includes(search)
                    ) {
                      return order;
                    } else if (
                      searchBy === "date" &&
                      date.toLowerCase().includes(search.toLocaleLowerCase())
                    ) {
                      return order;
                    } else if (
                      searchBy === "clientId" &&
                      clientId
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                    ) {
                      return order;
                    }
                  })
                  .map(({ date, clientId, orderName, id }) => (
                    <OrderRow
                      clientId={clientId}
                      orderName={orderName}
                      key={id}
                      date={date}
                      id={id}
                      OnDelete={OnDelete}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            margin: "auto",
          }}
          className="mt-5 col-12 col-lg-7"
        >
          You have no orders for now.
        </div>
      )}
    </>
  );
}

export default Orders;
