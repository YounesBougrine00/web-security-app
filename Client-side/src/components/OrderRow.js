import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RowDetails({ date, clientId, orderName, id, OnDelete }) {
  const [clientName, setClientName] = useState("");

  const getClientName = async (clientId) => {
    await axios.get(`http://localhost:3001/clients/${clientId}`).then((res) => {
      console.log(res.data);
      setClientName(`${res.data[0].firstName}  ${res.data[0].lastName}`);
    });
  };

  useEffect(async () => {
    console.log("first");
    getClientName(clientId);
    console.log("second");
  }, []);

  return (
    <tr>
      <th>{id}</th>
      <th>{clientId}</th>
      <th>{clientName}</th>
      <td>{orderName}</td>
      <td>{date}</td>
      <td className="gap__actions">
        <span className="badge  m-1 bg-info">
          <Link to={`/orders/${id}`} className="text-white">
            <i className="fas fa-edit"></i>
          </Link>
        </span>
        <span
          style={{ cursor: "pointer" }}
          className="badge  m-1 bg-danger"
          onClick={() => OnDelete(id)}
        >
          <i className="fas fa-trash-alt"></i>
        </span>
      </td>
    </tr>
  );
}

export default RowDetails;
