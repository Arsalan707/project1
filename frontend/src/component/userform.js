import React, { useState } from 'react';

function UserForm({ setState, state }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/add-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setState(!state);
    setFormData({ name: '', address: '', username: '', email: '' });
    console.log(data);
    // alert(data.error);

    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        username: data.username,
        email: data.email,
        address: data.address,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <div>
      <h1>FORM COMPONENT</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            required="true"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          userName:
          <input
            type="text"
            required="true"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            required="true"
            unique="true"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            required="true"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
