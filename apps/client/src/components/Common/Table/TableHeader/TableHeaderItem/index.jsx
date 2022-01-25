const TableHeaderItem = ({ title }) => {
  return (
    <th
      scope="col"
      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
    >
      {title}
    </th>
  );
};

export default TableHeaderItem;
