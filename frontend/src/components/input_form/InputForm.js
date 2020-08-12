import React from 'react';
import './InputForm.css';
import Field from '../../shared/form_field/Field';

function InputForm(props) {
  const { error } = props;
  return (
    <div className="input_form">
      <Field focus={true} label={error ? 'ERROR' : 'URL'} />
    </div>
  );
}

export default InputForm;
