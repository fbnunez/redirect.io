import React, { useState } from 'react';
import Field from '../../shared/form_field/Field';
import Header from '../header/Header';
import './InputForm.css';
import { Button, Box, Grid } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

function InputForm() {
  const [url, setUrl] = useState('URL');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();
  async function Redirect(obj) {
    setResult('');
    try {
      if (obj.url.length <= 7) {
        setError({ message: 'Your URL is too short' });
        return;
      }
      const opt = {
        url: obj.url,
      };
      const response = await fetch(`/url`, {
        method: 'POST',
        body: JSON.stringify(opt),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      console.log(response.status);
      if (response.status === 200) {
        console.log(json.alias);
        setResult(`redirect.io/url/${json.alias}`);
      } else {
        setUrl('');
        setError({
          message: json.message,
          stack: json.stack,
        });
      }
    } catch (err) {
      setUrl('');
      setError({
        message: 'Something went wrong... please try again',
        stack: '',
      });
    } finally {
      setLoading(false);
    }
  }
  const callback = (event) => {
    setUrl(event);
  };
  return (
    <div>
      <Header />
      <Field
        focus={true}
        label={error ? error.message : 'URL'}
        callback={callback}
        value={url}
      />
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
            Redirect({
              url,
            });
          }}
        >
          Redirect
        </Button>
      </Grid>
      <div className="result">{result ? <h1>{result}</h1> : null}</div>
    </div>
  );
}

export default InputForm;
