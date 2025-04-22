export default function BoardList({ currentUserId, onLogout }) {
    return (
      <div>
        <h1 className="text-xl">Добро пожаловать, пользователь: {currentUserId}</h1>
        <button onClick={onLogout} className="mt-4 bg-red-500 text-white px-2 py-1">
          Выйти
        </button>
        {/* Здесь будет список досок пользователя */}
      </div>
    );
  }
  