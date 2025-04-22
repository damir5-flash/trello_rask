import React, { useState, useEffect } from "react";
import "./styles/BoardScreen.css";

export default function BoardScreen({ boardId }) {
  const [board, setBoard] = useState(null);
  const [newColumnName, setNewColumnName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  
  // Загружаем доску из localStorage
  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem("boards")) || [];
    const selectedBoard = boards.find((board) => board.id === boardId);
    if (selectedBoard) {
      setBoard(selectedBoard);
    }
  }, [boardId]);

  // Функция для добавления новой колонки
  const addColumn = () => {
    const newColumn = {
      id: Date.now(),
      name: newColumnName,
      tasks: [],
    };

    const updatedBoard = { ...board, columns: [...board.columns, newColumn] };
    setBoard(updatedBoard);
    updateBoardInLocalStorage(updatedBoard);
    setNewColumnName("");
  };

  // Функция для добавления новой задачи
  const addTask = (columnId) => {
    const newTask = {
      id: Date.now(),
      name: newTaskName,
      description: newTaskDescription,
      completed: false,
    };

    const updatedColumns = board.columns.map((column) => {
      if (column.id === columnId) {
        return { ...column, tasks: [...column.tasks, newTask] };
      }
      return column;
    });

    const updatedBoard = { ...board, columns: updatedColumns };
    setBoard(updatedBoard);
    updateBoardInLocalStorage(updatedBoard);
    setNewTaskName("");
    setNewTaskDescription("");
  };

  // Функция для обновления доски в localStorage
  const updateBoardInLocalStorage = (updatedBoard) => {
    const boards = JSON.parse(localStorage.getItem("boards")) || [];
    const updatedBoards = boards.map((b) => (b.id === board.id ? updatedBoard : b));
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  if (!board) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="board-container">
      <h2>{board.name}</h2>

      {/* Форма для добавления новой колонки */}
      <div className="add-column">
        <input
          type="text"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          placeholder="Название новой колонки"
        />
        <button onClick={addColumn}>Добавить колонку</button>
      </div>

      {/* Отображаем колонки */}
      <div className="columns-container">
        {board.columns.map((column) => (
          <div key={column.id} className="column">
            <h3>{column.name}</h3>

            {/* Форма для добавления задачи в колонку */}
            <div className="add-task">
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Название задачи"
              />
              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Описание задачи"
              ></textarea>
              <button onClick={() => addTask(column.id)}>Добавить задачу</button>
            </div>

            {/* Отображаем задачи в колонке */}
            <div className="tasks-container">
              {column.tasks.map((task) => (
                <div key={task.id} className="task">
                  <h4>{task.name}</h4>
                  <p>{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
