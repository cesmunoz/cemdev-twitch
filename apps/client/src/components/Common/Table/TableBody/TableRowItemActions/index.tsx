/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
function TableRowItemActions({
  actions,
  itemId,
}: {
  actions: any;
  itemId: any;
}) {
  return (
    <td className="flex py-4 px-6 text-sm font-medium text-left whitespace-nowrap">
      {actions.map((action: any) => (
        <div
          key={action.action}
          onClick={() => action.action(itemId)}
          className="flex-1 cursor-pointer text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline"
        >
          {action.title}
        </div>
      ))}
    </td>
  );
}

export default TableRowItemActions;
