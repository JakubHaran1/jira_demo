import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProvider from "./providers/UserProvider";

// import BoardPage from "./pages/BoardPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
