import React from "react";
import classnames from "classnames";

function InputGroup({ label, type, name, onChangeHandler, errors, value, accept }) {
  return (
    <div>
      <label htmlFor="Email" className="form-label">
        {label}
      </label>
      <input
        type={type}
        value={value}
        className={classnames("form-control", { "is-invalid": errors })}
        name={name}
        accept={accept}
        onChange={onChangeHandler}
      />
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
}

export default InputGroup;
