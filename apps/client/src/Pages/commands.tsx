import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Command = {
  command: string;
  value: string;
};

const Commands = () => {
  const [commands, setCommands] = useState<Array<Command>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Command>();

  useEffect(() => {
    fetch("/api/commands-get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => setCommands(data));
      }
    });
  }, []);

  const handleNewEdit = (command?: Command) => {
    setIsNew(command !== null);
    setValue("command", command?.command ?? "");
    setValue("value", command?.value ?? "");
    setIsOpen(true);
  };

  const handleDelete = (command: Command) => {
    fetch("/api/commands-delete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    }).then((response) => {
      if (response.ok) {
        console.log("deleted");
      }
    });
  };

  const onSubmit = (data: Command) => {
    if (!isNew) {
      fetch("/api/commands-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          setIsOpen(false);
        }
      });
    } else {
      fetch("/api/commands-edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          setIsOpen(false);
        }
      });
    }
  };

  return (
    <div className="w-full px-10 min-w-full">
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded cursor-pointer"
        onClick={() => handleNewEdit()}
      >
        Create
      </button>
      <table className="table-auto w-full min-w-full max-w-7xl">
        <thead className="border-b">
          <tr>
            <th className="text-gray-600  py-4 pr-6 text-left">Command</th>
            <th className="text-gray-600  py-4 pr-6 text-left">Value</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {commands.map((item) => (
            <tr key={item.command} className="border-b">
              <td className="py-4 pr-6 text-left">{item.command}</td>
              <td className="py-4 pr-6 text-left">{item.value}</td>
              <td className="py-4 pr-6 text-left">
                <button
                  onClick={() => handleNewEdit(item)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Edit
                </button>
              </td>
              <td className="py-4 pr-6 text-left">
                <button
                  onClick={() => handleDelete(item)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed backdrop-blur-sm inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {isNew ? "Edit" : "Create"} Command
                  </Dialog.Title>
                  <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label
                        htmlFor="command"
                        className="block text-gray-700 font-bold"
                      >
                        Command
                      </label>
                      <input
                        id="command"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="!command"
                        {...register("command", {
                          required: "This is required.",
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="command"
                        render={({ message }) => (
                          <p className="text-red-500">{message}</p>
                        )}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="action"
                        className="block text-gray-700 font-bold"
                      >
                        Action
                      </label>
                      <input
                        id="value"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="this is a command action"
                        {...register("value", {
                          required: "This is required.",
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="value"
                        render={({ message }) => (
                          <p className="text-red-500">{message}</p>
                        )}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 cursor-pointer p-2 rounded text-white"
                      >
                        Submit
                      </button>
                      <button
                        className="bg-white cursor-pointer p-2 rounded text-black border border-gray-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Commands;
