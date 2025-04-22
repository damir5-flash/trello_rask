import { useState, useEffect } from "react";
import "./styles/LoginScreen.css";  // Подключаем стили для LoginScreen

export default function LoginScreen({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true); // Переключатель: вход или создание

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const handleCreateUser = () => {
    if (!newUser || !newPassword) return;
    const id = Date.now().toString();
    const user = { id, name: newUser, password: newPassword };
    const updatedUsers = [...users, user];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUserId", id);
    onLogin(id);
  };

  const handleSelectUser = () => {
    const user = users.find((u) => u.name === loginUser);
    if (user && user.password === loginPassword) {
      localStorage.setItem("currentUserId", user.id);
      onLogin(user.id);
    } else {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isLoginMode ? "Вход" : "Создать пользователя"}</h2>

        {isLoginMode ? (
          <>
            <input
              type="text"
              placeholder="Имя пользователя"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={handleSelectUser}>Войти</button>
            <a onClick={() => setIsLoginMode(false)}>Создать новый аккаунт</a>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Имя нового пользователя"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleCreateUser}>Создать</button>
            <a onClick={() => setIsLoginMode(true)}>Уже есть аккаунт? Войти</a>
          </>
        )}
      </div>
    </div>
  );
}
