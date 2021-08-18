import React, { useState, createContext } from 'react';

const ToDoContext = createContext();

function ToDoProvider(props) {
  const [ListToDo, setListToDo] = useState([]);

  return (
    <ToDoContext.Provider value={[ListToDo, setListToDo]}>
      {props.children}
    </ToDoContext.Provider>
  );
}

export { ToDoContext, ToDoProvider };
