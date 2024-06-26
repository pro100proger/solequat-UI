import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import Profile from "./pages/profile/Profile";
import Help from "./pages/help/Help";
import EquationSolver from "./pages/calculatingPages/equationSolver/equationSolver";
import EigenvaluesSolver from "./pages/calculatingPages/eigenvaluesSolver/eigenvaluesSolver";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
              <Route path="/" element={<Main/>}/>
              <Route path="main" element={<Main/>}/>
              <Route path="equation" element={<EquationSolver/>}/>
              <Route path="eigenvalues" element={<EigenvaluesSolver/>}/>
              <Route path="registration" element={<Registration/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="help" element={<Help/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
