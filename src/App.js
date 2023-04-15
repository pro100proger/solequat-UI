import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
              <Route path="/" element={<Main/>}/>
              <Route path="main" element={<Main/>}/>
              <Route path="registration" element={<Registration/>}/>
              <Route path="login" element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
