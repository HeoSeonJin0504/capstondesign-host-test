import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";

const MyRouter = () => {
  return (
    <BrowserRouter basename="/capstondesign-host-test/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
