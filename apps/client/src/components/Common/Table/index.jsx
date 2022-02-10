import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

function Table({ headers, items }) {
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
}

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      action: PropTypes.func,
    }),
  ).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
};

export default Table;
