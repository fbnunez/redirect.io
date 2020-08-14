import React, { useState } from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import './ErrorPage.css';

function ErrorPage(props) {
  const [errorObject] = useState(() => props.errorObject);

  return (
    <div className="error_page">
      <ErrorOutlineIcon className="error_icon" />
      <h1>We are sorry</h1>
      <h2>{errorObject.message}</h2>
      <footer className="footer">
        <h3>{errorObject.stack}</h3>
      </footer>
    </div>
  );
}

export default ErrorPage;
