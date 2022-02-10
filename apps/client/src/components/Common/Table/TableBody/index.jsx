import TableRowItem from './TableRowItem';

function TableBody({ keys, items }) {
  return (
    <tbody>
      {items.map((item) => (
        <TableRowItem
          key={item.id}
          keys={keys}
          item={item}
        />
      ))}
    </tbody>
  );
}

export default TableBody;
