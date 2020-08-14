import React, { useState } from 'react';
import Field from '../../shared/form_field/Field';
import { Button, Box, Grid } from '@material-ui/core';

async function redirect(obj) {
  const opt = {
    url: obj.url,
  };
  const result = await fetch(
    `http://localhost:3333/${window.location.pathname}`
  );
  console.log(result);
}

function InputForm(props) {
  const [url, setUrl] = useState();
  const callback = (event) => {
    setUrl(event);
  };
  return (
    <div className="input_form">
      <Field focus={true} label="URL" callback={callback} />
      <Grid
        style={{
          textAlign: 'center',
          marginTop: '10px', // this does the magic
        }}
      >
        <Button
          className="field_button"
          variant="contained"
          color="primary"
          style={{
            borderRadius: 2,
            padding: '5px 10px',
          }}
          onClick={() => {
            redirect({
              url,
            });
          }}
        >
          Redirect
        </Button>
      </Grid>
    </div>
  );
}

export default InputForm;
