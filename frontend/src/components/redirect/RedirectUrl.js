import React, { useState, useEffect } from 'react';

function FetchData(path) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  useEffect(() => {
    async function getUrl() {
      try {
        if (path.split('/').length === 3) {
          const alias = path.split('/')[2];
          const response = await fetch(
            `http://localhost:3333/redirect/${alias}`
          );
          const json = await response.json();
          // console.log(json);
          if (response.status === 200) {
            setResult(json.url);
          }
        }
      } finally {
        setLoading(false);
      }
    }
    getUrl();
  }, []);
  return [result, loading];
}

function RedirectUrl() {
  const [path, setPath] = useState(() => window.location.pathname);
  const [result, loading] = FetchData(path);
  console.log(result);

  if (loading) {
    return (
      <div>
        <h1>is loading</h1>
      </div>
    );
  }
  if (!result) {
    return (
      <div className="input_form">
        <h1>WRONG URL</h1>
      </div>
    );
  }
  window.location.href = result;
  return null;
}

export default RedirectUrl;
