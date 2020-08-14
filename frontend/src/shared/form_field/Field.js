import React, { useState } from 'react';
import './Field.css';

function Field(props) {
  const { url, id, focus = false, label = '', onChance = () => {} } = props;
  return (
    <div className="field">
      <input
        id={id}
        type="text"
        value={url}
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
