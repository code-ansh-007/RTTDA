import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../firebase";

const Todo = ({ todo, id }) => {
  const [edit, setEdit] = useState(false);
  const [edittedTodo, setEdditedTodo] = useState(todo);
  const inputRef = useRef(null);

  function setWritingCursor() {
    setEdit(true);
    // ? setting the writing cursor to the last word of the input tag
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.value.length;
        inputRef.current.selectionEnd = inputRef.current.value.length;
      }
    }, 0); // add a delay of 1 second
  }

  async function editTodo() {
    // ? logic to make changes to the firestore db
    await setDoc(
      doc(db, "todos", id),
      {
        task: edittedTodo,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );
    setEdit(false);
  }

  async function deleteTodo() {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console("error while deleting: ", error);
    }
  }

  return (
    <>
      <div className="flex items-center space-x-2 my-2 border-2 justify-between sm:max-w-2xl border-blue-500 p-2 w-full rounded-md">
        {edit ? (
          <input
            ref={inputRef}
            type="text"
            id="edit-input"
            value={edittedTodo}
            className="bg-inherit outline-none w-full"
            onChange={(e) => setEdditedTodo(e.target.value)}
          />
        ) : (
          <span
            style={{
              overflowWrap: "normal",
              wordBreak: "break-word",
            }}
          >
            {todo}
          </span>
        )}

        {/* tools div */}
        <div className="flex items-center space-x-3 pr-1 pl-2">
          {edit ? (
            <i
              onClick={editTodo}
              className="fa-solid fa-check text-green-400"
            ></i>
          ) : (
            <i
              onClick={setWritingCursor}
              className="fa-solid fa-pencil duration-200 hover:rotate-45 text-orange-400"
            ></i>
          )}{" "}
          <i
            onClick={deleteTodo}
            className="fa-solid fa-trash hover:scale-105 hover:animate-pulse text-red-500"
          ></i>
        </div>
      </div>
    </>
  );
};

export default Todo;
