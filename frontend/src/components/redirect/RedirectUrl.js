import React, { useState, useEffect } from 'react';
import ErrorPage from '../error_page/ErrorPage';

function FetchData(path) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getUrl() {
      try {
        if (path.split('/').length === 3) {
          const alias = path.split('/')[2];
          const response = await fetch(`/redirect/${alias}`, { method: 'GET' });
          const json = await response.json();
          if (response.status === 200) {
            setResult(json.url);
          } else {
            setError({
              message: json.message,
              stack: json.stack,
            });
          }
        }
      } finally {
        setLoading(false);
      }
    }
    getUrl();
  }, []);
  return [result, loading, error];
}

function RedirectUrl() {
  const [path] = useState(() => window.location.pathname);
  const [result, loading, error] = FetchData(path);
  const [color] = useState(() => 'white');

  return (
    <div
      style={{
        backgroundColor: color,
        minHeight: '100vh',
      }}
    >
      {loading ? null : !result ? (
        <ErrorPage errorObject={error} />
      ) : (
        null((window.location.href = result))
      )}
    </div>
  );
}

export default RedirectUrl;
