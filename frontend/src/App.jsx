import React from 'react';
import {useQuery, useMutation} from '@apollo/client'
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import { ADD_TASK, GET_List, REMOVE_TASK, TOGGLE_TASK } from './constants';


const App = () => {
  const {data, refetch} = useQuery(GET_List);
  const [addTask] = useMutation(ADD_TASK);
  const [removeTask] = useMutation(REMOVE_TASK);
  const [toggleTask] = useMutation(TOGGLE_TASK);

  const {list} = data || {};
 
  const addTaskData = (text) => {
    const id = `${Date.now()}`
    const completed = false;
    addTask({ variables: { id:id, text: text, completed:completed} });
    refetch();
  };

  const deleteTask = (id) => {
    removeTask({variables:{id}});
    refetch();
  };

  const toggleTaskData = (id) => {
    const dataFi = list.filter((item) => item.id==id)
    toggleTask({ variables: { id:id, completed:!dataFi[0]?.completed} });
    refetch();
  };

  return (

    <div className="todo-app">
      <h1>Todo List</h1>
      <TodoForm onAdd={addTaskData} />
      <div className="todo-list">
        {list?.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleTaskData}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
