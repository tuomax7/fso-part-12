import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos
        .map((todo, index) => {
          return (
            <Todo
              key={index}
              todo={todo}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
            />
          );
        })
        .reduce((acc, cur) => [...acc, <hr key={`${cur.key}.5`} />, cur], [])}
    </>
  );
};

export default TodoList;
