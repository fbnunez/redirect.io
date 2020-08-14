import React, { useState } from 'react';
import Field from '../../shared/form_field/Field';
import Header from '../header/Header';
import './InputForm.css';
import { Button, Grid } from '@material-ui/core';
import { useTransition, animated } from 'react-spring';

function InputForm() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState();
  const [show, setShow] = useState(false);
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  async function Redirect(obj) {
    setShow(false);
    try {
      setResult('');
      if (obj.url.length <= 7) {
        setUrl('');
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
      if (response.status === 200) {
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
      setShow(true);
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
      <div className="result">
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <h1>{result}</h1>
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}

export default InputForm;
