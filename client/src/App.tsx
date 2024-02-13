import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ErrorPage } from "./pages/error-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route path="login/" element={<Login />} />
        <Route path="register/" element={<Register />} />
        <Route path="/:any" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
