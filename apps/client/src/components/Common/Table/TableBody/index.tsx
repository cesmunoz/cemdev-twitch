/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import TableRowItem from './TableRowItem';

function TableBody({
  keys,
  items,
}: {
  keys: any;
  items?: any;
}) {
  return (
    <tbody>
      {items.map((item: any) => (
        <TableRowItem
          key={item.id}
          keys={keys}
          item={item}
        />
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  keys: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  // items: PropTypes.arrayOf(PropTypes.object.isRequired),
};

TableBody.defaultProps = {
  items: [],
};

export default TableBody;
