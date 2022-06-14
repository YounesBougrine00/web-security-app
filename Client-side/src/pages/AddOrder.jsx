import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import { Link } from "react-router-dom";

function AddOrder() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    console.log(today);
    axios
      .post(`http://localhost:3001/orders/${id}`, { ...form, date: today })
      .then((res) => {
        history.push("/clients");
      });
  };

  return (
    <div className="container mt-4 col-12 col-lg-4">
      <form onSubmit={onSubmitHandler}>
        <InputGroup
          label="Order name"
          type="text"
          name="orderName"
          onChangeHandler={onChangeHandler}
          errors={errors.Lastname}
          value={form.orderName}
        />
        <button className="mt-3 btn btn-primary" type="submit">
          Add order
        </button>
        <Link to="/clients">
          <button style={{ float: "right" }} className="mt-3 btn btn-danger">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
}

export default AddOrder;
