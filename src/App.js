import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/main/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}>
              <Route path="main" element={<Main/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
