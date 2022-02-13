/* eslint-disable import/no-extraneous-dependencies */
import TableRowItemActions from '../TableRowItemActions';

function TableRowItem({
  keys,
  item,
}: {
  keys: any;
  item: any;
}) {
  const titleKeys = keys.filter((key: any) => !key.action);
  const actions = keys.filter((key: any) => key.action);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-left">
      {titleKeys.map((key: any) => (
        <td
          key={`${item.id}-${key.key}`}
          className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
        >
          {item[key.key]}
        </td>
      ))}
      {actions.length > 0 && (
        <TableRowItemActions
          actions={actions}
          itemId={item.id}
        />
      )}
    </tr>
  );
}

export default TableRowItem;
