import React from 'react';
import './Field.css';

function Field(props) {
  const { id, focus = false, label = '' } = props;
  return (
    <div className="field">
      <input
        id={id}
        type="text"
        value={props.value}
        autoFocus={focus}
        placeholder={label}
        onChange={(event) => {
          props.callback(event.target.value);
        }}
      />
    </div>
  );
}

export default Field;
