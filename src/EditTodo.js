import Modal from "./Modal";
import { useState } from "react";
import "./editTodo.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

function EditTodo({ open, onClose, toEditTitle, toEditTodoItem, id }) {
  const [title, setTitle] = useState(toEditTitle);
  const [todoItem, setTodoItem] = useState(toEditTodoItem);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const todoDocRef = doc(db, "todos", id);
    try {
      await updateDoc(todoDocRef, {
        title: title,
        todoItem: todoItem,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Edit Todo" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTodo">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        />
        <textarea
          onChange={(e) => setTodoItem(e.target.value)}
          value={todoItem}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTodo;
