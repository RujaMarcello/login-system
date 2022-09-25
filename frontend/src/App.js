import SingUp from "./SingUp/SingUp";
import SingIn from "./SingIn/SingIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SingIn />}></Route>
          <Route path="/singup" element={<SingUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
