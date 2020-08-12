import React, { useState } from 'react';
import './Field.css';

function Field(props) {
  const { focus = false, label = '', onChance = () => {} } = props;
  const [value, setValue] = useState(props.value);
  const [id, setId] = useState(props.id);
  const [error, setError] = useState();
  return (
    <div className="field">
      <input
        id={id}
        value={value}
        type="text"
        autoFocus={focus}
        placeholder={label}
        onChance={(event) => {
          setValue(event.target.value);
          setError('');
        }}
      />
    </div>
  );
}

export default Field;
