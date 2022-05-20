import React, { useRef } from "react";
import PropTypes from "prop-types";

const CheckBox = (props) => {
  const inputRef = useRef();
  const onChange = () => props.onChange(inputRef.current);
  return (
    <div>
      <label className="custom-checkbox">
        <input
          type="checkbox"
          ref={inputRef}
          onChange={onChange}
          checked={props.checked}
          name={props.name}
        />
        <span className="custom-checkbox__checkmark">
          <i className="fa-solid fa-check"></i>
        </span>
        {props.label}
      </label>
    </div>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default CheckBox;
