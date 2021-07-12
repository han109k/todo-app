import React, { useContext, useReducer } from "react";
import reducer from "./todoReducer";

const TodoContext = React.createContext();

const defaultState = {
  isAuthenticated: false,
  name: "",
  todoList: [],
  watchTodos: false,
};

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(TodoContext);
};

export { TodoProvider };
