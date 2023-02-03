import { useEffect, useState } from "react";

type Requests = {
  id: string;
  username: string;
  value: string;
};

const Requests = () => {
  const [requests, setRequests] = useState<Array<Requests>>([]);

  useEffect(() => {
    fetch("/api/requests-get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => setRequests(data));
      }
    });
  }, []);

  return (
    <div className="w-full px-10 min-w-full">
      <table className="table-auto w-full min-w-full max-w-7xl">
        <thead className="border-b">
          <tr>
            <th className="text-gray-600  py-4 pr-6 text-left">User</th>
            <th className="text-gray-600  py-4 pr-6 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-4 pr-6 text-left">{item.username}</td>
              <td className="py-4 pr-6 text-left">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
