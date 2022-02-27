import { useState } from 'react';
import { Table } from '../../components/Common';

function Commands() {
  // eslint-disable-next-line no-unused-vars
  const [requestList, setRequestList] = useState([
    {
      id: 1,
      request: 'explicar reduce un dia',
      timestamp: '2020-01-01T00:00:00.000Z',
      user: 'cemdev',
    },
    {
      id: 2,
      request: 'programa en angularjs',
      timestamp: '2020-01-02T00:00:00.000Z',
      user: 'cemdev',
    },
    {
      id: 3,
      request: 'podes explicarnos cqrs',
      timestamp: '2020-01-03T00:00:00.000Z',
      user: 'cemdev',
    },
  ]);

  const handleApprove = (id: any) => {
    // eslint-disable-next-line no-console
    console.log('Handle Approve', id);
  };
  const handleDecline = (id: any) => {
    // eslint-disable-next-line no-console
    console.log('Handle Decline', id);
  };

  const HEADERS = [
    { key: 'user', title: 'User' },
    { key: 'request', title: 'Request' },
    { key: 'timestamp', title: 'Timestamp' },
    {
      key: 'approve',
      title: 'Approve',
      action: handleApprove,
    },
    {
      key: 'decline',
      title: 'Decline',
      action: handleDecline,
    },
  ];

  return <Table headers={HEADERS} items={requestList} />;
}

export default Commands;
