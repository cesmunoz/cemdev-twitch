const TableRowItem = ({ keys, item }) => {
  const titleKeys = keys.filter(key => !key.action);
  const actions = keys.filter(key => key.action);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {titleKeys.map(key => (
        <td
          key={`${item.id}-${key.key}`}
          className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {item[key.key]}
        </td>
      ))}
      <td className="flex py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
        {actions.map(action => (
          <div
            key={action.action}
            onClick={() => action.action(item.id)}
            className="flex-1 cursor-pointer text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline"
          >
            {action.title}
          </div>
        ))}
      </td>
    </tr>
  );
};

export default TableRowItem;
