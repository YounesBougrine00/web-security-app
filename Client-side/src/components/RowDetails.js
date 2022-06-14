import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";

import DaDog from "../asstets/images/dadog.jpg";

function RowDetails({
  Email,
  Lastname,
  Firstname,
  Adresse,
  Phone,
  id,
  OnDelete,
  Photo,
}) {
  const history = useHistory();
  const click = () => {
    history.push(`/client-orders/${id}`);
  };
  const style = {
    cursor: "pointer",
  };

  return (
    <tr>
      <td onClick={click} style={style}>
        {id}
      </td>
      <td onClick={click} style={style}>
        <img style={{ width: "70px" }} src={"./images/" + Photo} />
      </td>
      <td onClick={click} style={style}>
        {Email}
      </td>
      <td onClick={click} style={style}>
        {Lastname}
      </td>
      <td onClick={click} style={style}>
        {Firstname}
      </td>
      <td onClick={click} style={style}>
        {Adresse}
      </td>
      <td onClick={click} style={style}>
        {Phone}
      </td>
      <td className="gap__actions">
        <span className="badge  m-1 bg-info">
          <Link to={`/clients/${id}`} className="text-white">
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
        <span style={{ cursor: "pointer" }} className="badge m-1 bg-info">
          <Link to={`/add-order/${id}`} className="text-white">
            <i className="fas fa-plus"></i>
          </Link>
        </span>
      </td>
    </tr>
  );
}

export default RowDetails;
