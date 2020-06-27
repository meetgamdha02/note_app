import React from 'react';
import {Main} from './Components/mainComponent'
import {BrowserRouter} from 'react-router-dom'
function App() {
  return (
      <BrowserRouter>
          <Main/>
      </BrowserRouter>
  );
}

export default App;
