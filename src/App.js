
import { useState } from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [todo, setTodo] = useState("");

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (todo !== "") {
      setTodos([...todos,
      {
        id: uuidv4(),
        text: todo
      }
      ]);
    }
    // Clear the todo input box once it is submitted
    setTodo("");
  }

  function handleTodoToCompleted(id) {
    const changeState = todos.filter((todo) => {
      return todo.id !== id;
    });

    const completedTodo = todos.filter((todo) => {
      return todo.id === id;
    })[0].text;

    setCompletedTodos([...completedTodos,
    {
      id: uuidv4(),
      text: completedTodo
    }
    ]);

    setTodos(changeState);
  }

  function handleCompletedToTodo(id) {
    const changeState = completedTodos.filter((completedTodo) => {
      return completedTodo.id !== id;
    });

    const incompleteTodo = completedTodos.filter((completedTodo) => {
      return completedTodo.id === id;
    })[0].text;

    setTodos([...todos,
    {
      id: uuidv4(),
      text: incompleteTodo
    }]);

    setCompletedTodos(changeState);
  }

  return (
    <div className="Body">
      <div className="App">
        <form onSubmit={handleFormSubmit}>
          <h1>Frontend Todo Challenge</h1>
          <input className="input" type="text" placeholder="Add an item" value={todo} onChange={handleInputChange} />
        </form>

        <h2>Todo</h2>
        <ul>
          {todos.map((todo) => (
            <li className="li" key={uuidv4()} onClick={() => handleTodoToCompleted(todo.id)}>{todo.text}</li>
          ))}
        </ul>
        <h2>Completed</h2>
        <ul>
          {completedTodos.map((completedTodo) => (
            <div className="li-completed"><li key={uuidv4()} onClick={() => handleCompletedToTodo(completedTodo.id)}>{completedTodo.text}</li></div>
          ))}
        </ul>
      </div>
    </div >
  );
}

export default App;
