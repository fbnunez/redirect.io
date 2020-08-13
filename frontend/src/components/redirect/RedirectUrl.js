import React, { useState, useEffect } from 'react';

function FetchData(path) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  useEffect(() => {
    async function getUrl() {
      try {
        if (path.split('/').length === 3) {
          const alias = path.split('/')[2];
          const response = await fetch(`/redirect/${alias}`, { method: 'GET' });
          const json = await response.json();
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
  const [color, setColor] = useState(() => 'white');
  console.log(result);

  return (
    <div
      style={{
        backgroundColor: color,
        minHeight: '100vh',
      }}
    >
      {loading ? null : !result ? (
        <div>
          <h1>WRONG URL</h1>
        </div>
      ) : (
        null((window.location.href = result))
      )}
    </div>
  );
}

export default RedirectUrl;
