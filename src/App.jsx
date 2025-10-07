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
      const exist = currentTodos.some( todo => todo.title.toLowerCase() === title.toLowerCase())
  
// checking title wiht already saved titiel
      if (exist){

        window.confirm("should I add this ")
        return currentTodos
      }
   
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
  const [search, setSearch] = useState("")
 const searchMode = todos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))

  // const completeCount = todos.filter(todo => todo.completed).length

// const pendingCount =  todos.length - completeCount

  return (
    <>
     
      {/* <p> {completeCount} / {pendingCount}</p> */}
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder = "search here"/>
   
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={searchMode} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
      
    </>
  );
}

