import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import { ThemeProvider } from "../context/ThemeContext.jsx";

function AppRouter() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default AppRouter;
