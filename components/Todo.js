import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

const Todo = ({ todo, id }) => {
  const [edit, setEdit] = useState(false);
  const [edittedTodo, setEdditedTodo] = useState(todo);

  async function editTodo() {
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
            type="text"
            id="edit-input"
            value={edittedTodo}
            className="bg-inherit outline-none w-full"
            onChange={(e) => setEdditedTodo(e.target.value)}
          />
        ) : (
          <span className="break-all">{todo}</span>
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
              onClick={() => {
                setEdit(true);
              }}
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
