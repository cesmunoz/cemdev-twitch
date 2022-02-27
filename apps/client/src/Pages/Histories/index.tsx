import { useEffect, useState } from 'react';
import { getAll } from '../../utils/entity';
import { Table } from '../../components/Common';

function Histories() {
  // eslint-disable-next-line no-unused-vars
  const [historyList, setHistoryList] = useState([]);
  const [lastId, setLastId] = useState(null);

  useEffect(() => {
    getAll(`histories?lastId=${lastId}`).then(
      (response) => {
        setHistoryList(response);
        setLastId(response[response.length - 1].id);
      },
    );
  }, []);

  const HEADERS = [
    { key: 'user', title: 'User' },
    { key: 'command', title: 'Command' },
    { key: 'timestamp', title: 'Timestamp' },
  ];

  return <Table headers={HEADERS} items={historyList} />;
}

export default Histories;
