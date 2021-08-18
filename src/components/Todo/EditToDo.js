import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { ToDoContext } from '../../context/ToDoContext';
import Button from '../Common/Button';

const EditToDo = ({ handleEditToDo, data }) => {
  const [ListToDo, setListToDo] = useContext(ToDoContext);
  const [userInput, setUserInput] = useState({
    id: '',
    title: '',
    description: '',
    status: 0,
    createdAt: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let copy = [...ListToDo];
    copy = [
      ...copy,
      {
        id: ListToDo.length + 1,
        title: userInput.title,
        description: userInput.description,
        status: 0,
        createdAt: new Date(),
      },
    ];
    setListToDo(copy);
    console.log('copy ', copy);
    handleEditToDo();
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setUserInput({
      ...userInput,
      [e.target.name]: value,
    });
  };
  useEffect(() => {
    setUserInput({
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status,
    });
  }, []);
  console.log('Edit Data ', data);
  console.log('Edit userInput ', data);
  const handleDeleteToDo = (id) => {
    const copy = ListToDo.filter((item) => item.id !== id);
    setListToDo(copy);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col z-10">
      <div
        className="h-full w-full absolute bg-black opacity-40"
        onClick={handleEditToDo}
      ></div>
      <div className="bg-white rounded-md mx-auto my-auto max-w-md w-full h-auto px-4 py-8 relative z-10">
        <button
          class="flex items-center justify-center h-8 w-8 absolute right-3 top-3  mt-auto font-semibold text-sm text-white transition duration-500 ease-in-out transform bg-red-600 rounded-lg  hover:bg-red-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
          onClick={handleEditToDo}
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-black font-bold text-2xl">Edit Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <label className="w-full flex flex-col">
            <span className="text-base">To Do Id</span>
            <input
              disabled
              type="text"
              name="title"
              onChange={handleChange}
              value={userInput.id}
              className="border border-gray-400 px-4 py-2 text-base rounded-sm"
            />
          </label>
          <label className="w-full flex flex-col">
            <span className="text-base">To Do </span>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={userInput.title}
              className="border border-gray-400 px-4 py-2 text-base rounded-sm"
            />
          </label>
          <label className="w-full flex flex-col">
            <span className="text-base">Description </span>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={userInput.description}
              className="border border-gray-400 px-4 py-2 text-base rounded-sm"
            />
          </label>
          <div
            className={clsx(
              'flex ',
              userInput.status === 0 ? 'justify-between' : 'justify-end'
            )}
          >
            {userInput.status === 0 && (
              <Button
                variant="delete"
                ariaLabel="delete button"
                className="py-3 px-6"
                onClick={() => handleDeleteToDo(userInput.id)}
              >
                Delete
              </Button>
            )}
            <Button variant="primary" className="py-3 px-6">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditToDo;
