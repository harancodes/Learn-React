import { useState } from "react";

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  function handleEditSubmit(e) {
    e.preventDefault();
    if (editedTitle.trim() === "") return;
    editTodo(id, editedTitle);
    setIsEditing(false);
  }



  
  return (

    <div>

    <p> Count : {}</p>
    <li className="todo-item">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
        <textarea
  value={editedTitle}
  onChange={e => setEditedTitle(e.target.value)}
  className="edit-input"
  autoFocus
  rows={3}
/>

          <button type="submit" className="btn">Save</button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setIsEditing(false);
              setEditedTitle(title);
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <label
            style={{
              textDecoration: completed ? "line-through" : "none",
              color: completed ? "gray" : "black",
              flex: 1
            }}
          >
         
            <input
              type="checkbox"
              checked={completed}
              onChange={e => toggleTodo(id, e.target.checked)}
            />
            {title}
          </label>
          
          <button onClick={() => setIsEditing(true)} className="btn">Edit</button>
          <button onClick={() => deleteTodo(id)} className="btn btn-danger">Delete</button>
        
        </>
      )}
    </li>
    </div>
  );
}
