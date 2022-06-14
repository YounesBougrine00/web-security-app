import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import InputGroup from "../components/InputGroup";
import { Link } from "react-router-dom";

function ClientDetails() {
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
    axios.put(`http://localhost:3001/clients/${id}`, form).then((res) => {
      history.push("/clients");
    });
  };

  useEffect(async () => {
    await axios.get(`http://localhost:3001/clients/${id}`).then((res) => {
      console.log(res.data[0]);
      setForm(res.data[0]);
      console.log(form);
    });
  }, []);
  return (
    <div className="container mt-4 col-12 col-lg-4">
      <form onSubmit={onSubmitHandler}>
        <InputGroup
          label="Email"
          type="text"
          name="email"
          onChangeHandler={onChangeHandler}
          value={form.email}
        />
        <InputGroup
          label="Lastname"
          type="text"
          name="lastName"
          onChangeHandler={onChangeHandler}
          value={form.lastName}
        />
        <InputGroup
          label="Firstname"
          type="text"
          name="firstName"
          onChangeHandler={onChangeHandler}
          value={form.firstName}
        />
        <InputGroup
          label="Adresse"
          type="text"
          name="adresse"
          onChangeHandler={onChangeHandler}
          value={form.adresse}
        />
        <InputGroup
          label="Phone"
          type="text"
          name="phone"
          onChangeHandler={onChangeHandler}
          value={form.phone}
        />
        <button className="mt-3 btn btn-primary" type="submit">
          Update client
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

export default ClientDetails;
