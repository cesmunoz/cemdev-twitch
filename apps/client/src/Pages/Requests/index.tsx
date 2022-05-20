import { useEffect } from 'react';
import { getAll } from '../../api/entity';
import { Table } from '../../components/Common';
import {
  RequestProvider,
  useRequestContext,
} from './RequestsContext';

function RequestContainer() {
  const { requests, setRequests } = useRequestContext();

  useEffect(() => {
    getAll('requests-get').then((response: any) => {
      setRequests(response);
    });
  }, []);

  const handleApprove = (id: any) => {
    // eslint-disable-next-line no-console
    console.log('Handle Approve', id);
  };
  const handleDecline = (id: any) => {
    // eslint-disable-next-line no-console
    console.log('Handle Decline', id);
  };

  const HEADERS = [
    { key: 'id', isKey: true, hidden: true },
    { key: 'username', title: 'Username' },
    { key: 'value', title: 'Request' },
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

  return (
    <RequestProvider>
      <Table headers={HEADERS} items={requests} />
    </RequestProvider>
  );
}

function Requests() {
  return (
    <RequestProvider>
      <RequestContainer />
    </RequestProvider>
  );
}

export default Requests;
