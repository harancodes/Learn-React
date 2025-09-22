import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import "./style.css";



export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false }
      ];
    });
  }



  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  }
  function editTodo(id, newTitle) {
  setTodos(currentTodos =>
    currentTodos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    )
  );
}  




 const completedCount =  todos.filter(todo => todo.completed).length



  return (
    <>

      <p1>
        Count : {completedCount}/{todos.length}
      </p1>
      <p1>
        {/* sort : {showTodo} */}
      </p1>
    
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={coustomDisplay} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
      
    </>
  );
}

