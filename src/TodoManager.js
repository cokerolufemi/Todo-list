import "./taskManager.css";
import Todo from "./Todo";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import AddTodo from "./AddTodo";

function TodoManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [todos, setTodos] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const todoColRef = query(
      collection(db, "todos"),
      orderBy("created", "desc")
    );
    onSnapshot(todoColRef, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="taskManager">
      <header>Todo List App</header>
      <div className="taskManager__container">
        <button onClick={() => setOpenAddModal(true)}>Add</button>
        <div className="taskManager__tasks">
          {todos.map((todo) => (
            <Todo
              id={todo.id}
              key={todo.id}
              completed={todo.data.completed}
              title={todo.data.Title}
              todoItem={todo.data.TodoItem}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddTodo onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
}

export default TodoManager;
