import React, { useContext, useEffect, useState } from 'react';
import { ToDoContext } from '../context/ToDoContext';
import Button from './Common/Button';
import Card from './Common/Card';

import Heading from './Common/Heading';
import Check from './Icon/Check';
import Pencil from './Icon/Pecil';
import Trash from './Icon/Trash';
import AddTodo from './Todo/AddToDo';
import EditToDo from './Todo/EditToDo';

const ListTodo = () => {
  const [ListToDo, setListToDo] = useContext(ToDoContext);
  const apiTodo =
    'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list';

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(apiTodo);
      response = await response.json();
      setListToDo(response);
    }

    fetchMyAPI();
  }, []);

  const handleDeleteToDo = (id) => {
    const copy = ListToDo.filter((item) => item.id !== id);

    setListToDo(copy);
    console.log('copy ', copy);
  };
  const handleCompleteToDo = (id) => {
    const copy = ListToDo.filter((item) => item.id === id);
    const sliceArray = ListToDo.slice();
    copy[0].status = 1;
    setListToDo(sliceArray);
  };
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const toggleModal = (ModalIndex) => {
    if (activeModalIndex === ModalIndex) setActiveModalIndex(null);
    else setActiveModalIndex(ModalIndex);
  };

  return (
    <div className="max-w-screen-xl mx-auto pt-24">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-full flex justify-end">
          <Button
            ariaLabel="button submit"
            className=" py-3 w-auto px-6"
            variant="primary"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Add To Do
          </Button>
        </div>
        <div className="col-start-2 col-span-4">
          <Heading>List Todo</Heading>
          <div className="flex flex-col space-y-4 mt-4">
            {ListToDo &&
              ListToDo.filter((dataStatus) => dataStatus.status === 0).map(
                (filteredStatus, index) => (
                  <>
                    <Card key={filteredStatus.id}>
                      <div className="flex justify-between">
                        <h6 className="text-gray-800">
                          {filteredStatus.title}
                        </h6>
                        <div className="flex space-x-2">
                          <Button
                            ariaLabel="button edit"
                            variant="edit"
                            onClick={() =>
                              handleCompleteToDo(filteredStatus.id)
                            }
                            className="h-8 w-8"
                          >
                            <Check className="h-4 w-4 text-green-700 group-hover:text-green-300 transition-all" />
                          </Button>
                          <Button
                            ariaLabel="button delete"
                            variant="delete"
                            onClick={() => handleDeleteToDo(filteredStatus.id)}
                            className="h-8 w-8"
                          >
                            <Trash className="h-4 w-4 text-red-700 transition-all group-hover:text-red-300" />
                          </Button>
                          <Button
                            ariaLabel="button delete"
                            variant="primary-light"
                            onClick={() => {
                              toggleModal(filteredStatus.id);
                            }}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4 text-blue-700 transition-all group-hover:text-blue-300" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                    {activeModalIndex === filteredStatus.id && (
                      <EditToDo
                        handleEditToDo={() => toggleModal(filteredStatus.id)}
                        data={filteredStatus}
                      />
                    )}
                  </>
                )
              )}
          </div>
        </div>
        <div className="col-start-7 col-span-4">
          <Heading>List Todo Complete</Heading>
          <div className="flex flex-col space-y-4 mt-4">
            {ListToDo &&
              ListToDo.filter((dataStatus) => dataStatus.status === 1).map(
                (filteredStatus) => (
                  <>
                    <Card key={filteredStatus.id}>
                      <div className="flex justify-between">
                        <h6 className="text-gray-800">
                          {filteredStatus.title}
                        </h6>
                        <div className="flex space-x-2">
                          <Button
                            ariaLabel="button edit"
                            variant="edit"
                            onClick={() =>
                              handleCompleteToDo(filteredStatus.id)
                            }
                            className="h-8 w-8"
                          >
                            <Check className="h-4 w-4 text-green-700 group-hover:text-green-300 transition-all" />
                          </Button>
                          <Button
                            ariaLabel="button delete"
                            variant="primary-light"
                            onClick={() => {
                              toggleModal(filteredStatus.id);
                            }}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4 text-blue-700 transition-all group-hover:text-blue-300" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                    {activeModalIndex === filteredStatus.id && (
                      <EditToDo
                        handleEditToDo={() => toggleModal(filteredStatus.id)}
                        data={filteredStatus}
                      />
                    )}
                  </>
                )
              )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddTodo handleAddToDo={() => setIsModalOpen(!isModalOpen)} />
      )}
    </div>
  );
};

export default ListTodo;
