import Modal from "./Modal";
import { useState } from "react";
import "./addTodo.css";
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddTodos({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [todoItem, setTodoItem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "todos"), {
        Title: title,
        TodoItem: todoItem,
        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Add Todo" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTodo" name="addTodo">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="Enter title"
        />
        <textarea
          onChange={(e) => setTodoItem(e.target.value)}
          placeholder="Enter todo"
          value={todoItem}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}

export default AddTodos;
