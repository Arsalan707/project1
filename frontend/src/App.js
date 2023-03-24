import './App.css';
import React, { useState } from 'react';
import DataList from './component/datalist';
import UserForm from './component/userform';

function App() {
  const [state, setState] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <UserForm setState={setState} state={state} />
      </header>
      <DataList state={state} />
    </div>
  );
}

export default App;
