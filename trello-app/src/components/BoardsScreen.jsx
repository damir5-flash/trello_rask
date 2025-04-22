import { useState, useEffect } from "react";
import "./styles/BoardScreen.css";  // Подключаем стили для BoardsScreen

export default function BoardsScreen({ onBoardSelect }) {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");

  // Загружаем список досок из localStorage при монтировании
  useEffect(() => {
    const savedBoards = JSON.parse(localStorage.getItem("boards")) || [];
    setBoards(savedBoards);
  }, []);

  // Функция для добавления новой доски
  const addBoard = () => {
    if (newBoardName.trim() === "") return; // Не добавлять пустую доску
    const newBoard = {
      id: Date.now(), // Используем уникальный id на основе времени
      name: newBoardName,
    };
    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards)); // Обновляем localStorage
    setNewBoardName(""); // Очищаем поле ввода
  };

  return (
    <div>
      <h1>Мои доски</h1>

      {/* Форма для добавления новой доски */}
      <div>
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Введите название доски"
        />
        <button onClick={addBoard}>Добавить доску</button>
      </div>

      {boards.length === 0 ? (
        <p>У вас нет досок. Создайте новую.</p>
      ) : (
        <ul>
          {boards.map((board) => (
            <li key={board.id}>
              <button onClick={() => onBoardSelect(board.id)}>
                {board.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
