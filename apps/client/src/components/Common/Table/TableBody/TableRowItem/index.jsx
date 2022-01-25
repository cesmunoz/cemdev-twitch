import TableRowItemActions from "../TableRowItemActions";

const TableRowItem = ({ keys, item }) => {
  const titleKeys = keys.filter(key => !key.action);
  const actions = keys.filter(key => key.action);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-left">
      {titleKeys.map(key => (
        <td
          key={`${item.id}-${key.key}`}
          className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {item[key.key]}
        </td>
      ))}
      {actions.length > 0 && (
        <TableRowItemActions actions={actions} itemId={item.id} />
      )}
    </tr>
  );
};

export default TableRowItem;
