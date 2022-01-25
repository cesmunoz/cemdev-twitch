import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ headers, items }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <TableHeader items={headers} />
              <TableBody keys={headers} items={items} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
