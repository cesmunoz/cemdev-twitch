import TableHeaderItem from './TableHeaderItem';

function TableHeader({ items }) {
  const titleKeys = items.filter((key) => !key.action);
  const hasActions = items.filter((key) => key.action);

  const headerItems = [
    ...titleKeys,
    ...(hasActions && [{ key: 'actions', title: '' }]),
  ];

  return (
    <thead className="bg-gray-50 dark:bg-gray-700">
      <tr>
        {headerItems.map((item) => (
          <TableHeaderItem key={item.key} {...item} />
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
