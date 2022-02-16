import { useEffect, useState } from 'react';
import { getAll } from '../../api/entity';
import { Table } from '../../components/Common';

function Histories() {
  // eslint-disable-next-line no-unused-vars
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    getAll('histories').then((response) => setHistoryList(response));
  }, []);

  const HEADERS = [
    { key: 'user', title: 'User' },
    { key: 'command', title: 'Command' },
    { key: 'timestamp', title: 'Timestamp' },
  ];

  return <Table headers={HEADERS} items={historyList} />;
}

export default Histories;
