import React, { useEffect, useState } from 'react';

export default function MainPage() {
  const [data, setData] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/user/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => setData(result.data));
  }, []);

  return (
    <div>
      <h1>Main Page</h1>
      <p>{data}</p>
    </div>
  );
}
