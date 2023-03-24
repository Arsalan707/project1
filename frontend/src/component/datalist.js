import React, { useState, useEffect } from 'react';
// import UserForm from './userform';

function DataList({ state }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // const response = await fetch('http://localhost:3001/api/agenda');

      const response = await fetch('http://localhost:3001/api/showdata');
      const datas = await response.json();
      setData(datas);
    }
    fetchData();
  }, [state]);

  return (
    <div>
      <h1>DATALIST component</h1>
      {data?.map((item) => (
        <div key={item._id}>
          <h2>NAME: {item.name}</h2>
          <p>USERNAME: {item.username}</p>
          <p>EMAIL: {item.email}</p>
          <p>ADDRESS: {item.address}</p>
        </div>
      ))}
    </div>
  );
}

export default DataList;
