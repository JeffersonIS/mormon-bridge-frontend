import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './views/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/:roomCode" element={<Home/>} exact />
      <Route  path="/" element={<Home/>} exact />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
