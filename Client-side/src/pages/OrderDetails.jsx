import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import { Link } from "react-router-dom";

function OrderDetails() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const history = useHistory();

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/orders/${id}`, form).then((res) => {
      history.push("/orders");
    });
  };

  useEffect(async () => {
    await axios.get(`http://localhost:3001/orders/${id}`).then((res) => {
      setForm(res.data[0]);
    });
  }, []);
  return (
    <div className="container mt-4 col-12 col-lg-4">
      <form onSubmit={onSubmitHandler}>
        <InputGroup
          label="Order name"
          type="text"
          name="orderName"
          onChangeHandler={onChangeHandler}
          value={form?.orderName}
        />
        <button className="mt-3 btn btn-primary" type="submit">
          Update order
        </button>
        <Link to="/orders">
          <button style={{ float: "right" }} className="mt-3 btn btn-danger">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
}

export default OrderDetails;
