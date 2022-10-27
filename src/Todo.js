import "./todo.css";
import { useState } from "react";
import TodoItem from "./TodoItem";
import EditTodo from "./EditTodo";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

function Todo({ id, title, todoItem, completed }) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update firestore */
  const handleChange = async () => {
    const todoDocRef = doc(db, "todos", id);
    try {
      await updateDoc(todoDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  };

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const todoDocRef = doc(db, "todos", id);
    try {
      await deleteDoc(todoDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={`todo ${checked && "task--borderColor"}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          onChange={handleChange}
          type="checkbox"
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)}
        ></label>
      </div>
      <div className="task__body">
        <h2>{title}</h2>
        <p>{todoItem}</p>
        <div className="task__buttons">
          <div className="task__deleteNedit">
            <button
              className="task__editButton"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit
            </button>
            <button className="task__deleteButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div>
      </div>

      {open.view && (
        <TodoItem
          onClose={handleClose}
          title={title}
          description={todoItem}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditTodo
          onClose={handleClose}
          toEditTitle={title}
          toEditTodoItem={todoItem}
          open={open.edit}
          id={id}
        />
      )}
    </div>
  );
}

export default Todo;
