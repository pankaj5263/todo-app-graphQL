import React, {useState} from 'react'
const TodoForm = ({ onAdd }) => {
    const [newTask, setNewTask] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newTask.trim()) {
        onAdd(newTask);
        setNewTask('');
      }
    };
  
    return (
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    );
  };

  export default TodoForm;