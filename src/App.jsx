import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import "./style.css";





export default function App() {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
    setCount(prev => prev+1)

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

// search 
// const [search, setSearch] = useState("")

// const filterTodo = todos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))


  





  return (
    <>
      {/* <input type="text" placeholder="type something" value={search} onChange={(e) => {setSearch(e.target.value)}} /> */}
      <p> {count}</p>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
      
    </>
  );
}

