import TableRowItem from "./TableRowItem";

const TableBody = ({ keys, items }) => {
  return (
    <tbody>
      {items.map(item => (
        <TableRowItem key={item.id} keys={keys} item={item} />
      ))}
    </tbody>
  );
};

export default TableBody;
