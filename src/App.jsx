import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : ["Learn React", "Exercise", "Read 30 Minutes"];
  });

  // ← BARU: nyimpen habit yang udah dicentang
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("completed");
    return saved ? JSON.parse(saved) : [];
  });

  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // ← BARU: simpen completed ke localStorage juga
  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  const addHabit = () => {
    if (newHabit.trim() === "") return;
    setHabits([...habits, newHabit]);
    setNewHabit("");
  };

  const deleteHabit = (indexToDelete) => {
    setHabits(habits.filter((_, index) => index !== indexToDelete));
    setCompleted(completed.filter((i) => i !== indexToDelete));
  };

  // ← BARU: toggle centang/tidak
  const toggleHabit = (index) => {
    setCompleted((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)   // kalau udah dicentang → hapus
        : [...prev, index]                   // kalau belum → tambah
    );
  };
// Hitung berapa yang sudah dicentang dari total
const completedCount = completed.length;
const totalCount = habits.length;
  return (
    <div className="app">
      <h1>Habit Tracker</h1>
      

{/* ← BARU: progress counter */}
{totalCount > 0 && (
  <div className="progress-bar-wrapper">
    <div className="progress-header">
      <span className="progress-label">Today's Progress</span>
      <span className="progress-count">{completedCount}/{totalCount}</span>
    </div>
    <div className="progress-track">
      <div
        className="progress-fill"
        style={{ width: `${(completedCount / totalCount) * 100}%` }}
      />
    </div>
  </div>
)}

      <div className="input-row">
        <input
          type="text"
          placeholder="Add a new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addHabit()}
        />
        <button className="btn-add" onClick={addHabit}>Add</button>
      </div>

      <ul className="habit-list">
        {habits.length === 0 && (
          <p className="empty-state">No habits yet. Add one above!</p>
        )}
        {habits.map((habit, index) => (
          <li
            key={index}
            className={`habit-item ${completed.includes(index) ? "completed" : ""}`}
          >
            {/* ← BARU: checkbox */}
            <input
              type="checkbox"
              className="habit-checkbox"
              checked={completed.includes(index)}
              onChange={() => toggleHabit(index)}
            />
            <span>{habit}</span>
            <button className="btn-delete" onClick={() => deleteHabit(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;