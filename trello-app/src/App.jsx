import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import BoardsScreen from "./components/BoardsScreen";
import BoardScreen from "./components/BoardScreen";  // Подключаем компонент BoardScreen

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        {!user ? (
          <LoginScreen onLogin={setUser} />
        ) : (
          <div>
            <nav>
              <Link to="/">Главная</Link>
            </nav>

            <Routes>
              {/* Страница со списком досок */}
              <Route path="/" element={<BoardsScreen />} />

              {/* Страница доски */}
              <Route path="/board/:boardId" element={<BoardScreen />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}
