import React from 'react';
import { BrowserRouter , Routes , Route} from 'react-router-dom';

import './App.css';
import Card from './COMPONENTS/Card';
import Navbar from './COMPONENTS/Navbar';
import FileUploader from './FileUploader';
import Home from './Home';

function App() {
  return (
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>} />\
      <Route path='/upload' element={<FileUploader/>} />
      <Route path='/details' element={<Card/>} />
     </Routes>
     </BrowserRouter>
  );
}

export default App;
