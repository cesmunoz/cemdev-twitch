import { useState } from "react";
import { Table } from "../../Common";

const Histories = () => {
  const [historyList, setHistoryList] = useState([
    {
      id: 1,
      command: "saludar",
      timestamp: "2020-01-01T00:00:00.000Z",
      user: "cemdev"
    },
    {
      id: 2,
      command: "adios",
      timestamp: "2020-01-02T00:00:00.000Z",
      user: "cemdev"
    },
    {
      id: 3,
      command: "gordo",
      timestamp: "2020-01-03T00:00:00.000Z",
      user: "cemdev"
    }
  ]);

  const handleEdit = (id) => {
    console.log("handleEdit", id);
  };
  const handleRemove = (id) => {
    console.log("handleRemove", id);
  };

  const HEADERS = [
    { key: "user", title: "User" },
    { key: "command", title: "Command" },
    { key: "timestamp", title: "Timestamp" },
    { key: "edit", title: "Edit", action: handleEdit },
    { key: "remove", title: "Remove", action: handleRemove }
  ];

  return <Table headers={HEADERS} items={historyList} />;
};

export default Histories;
