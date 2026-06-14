import { useState, useEffect } from "react";
import "./App.css";  // ← ADD THIS

function App() {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits
      ? JSON.parse(savedHabits)
      : ["Learn React", "Exercise", "Read 30 Minutes"];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (newHabit.trim() === "") return;
    setHabits([...habits, newHabit]);
    setNewHabit("");
  };

  const deleteHabit = (indexToDelete) => {
    setHabits(habits.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="app">          {/* ← was style={{ padding: "20px" }} */}
      <h1>Habit Tracker</h1>

      <div className="input-row">  {/* ← wraps input + button together */}
        <input
          type="text"
          placeholder="Enter a habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button className="btn-add" onClick={addHabit}>Add</button>
      </div>

      <ul className="habit-list">
        {habits.length === 0 && (
          <p className="empty-state">No habits yet. Add one above!</p>
        )}
        {habits.map((habit, index) => (
          <li key={index} className="habit-item">
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