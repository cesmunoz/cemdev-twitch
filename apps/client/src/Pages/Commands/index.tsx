import {
  Button,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { createOne, getAll } from '../../api/entity';
import { Table } from '../../components/Common';
import { HeaderItems } from '../../components/Common/Table';
import CommandDialogForm from './CommandDialogForm';

function Commands() {
  // eslint-disable-next-line no-unused-vars
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    getAll('commands-get').then((response:any) => setRequestList(response));
  }, []);

  const handleEdit = (id: any) => {
    // eslint-disable-next-line no-console
    console.log('Handle Approve', id);
  };
  const handleDelete = (id: any) => {
    // eslint-disable-next-line no-console
    console.log('Handle Decline', id);
  };

  const handleSave = (model: any) => {
    createOne('commands-post', model).then((response) => {
      setRequestList([...requestList, response]);
    });
  };

  const HEADERS: HeaderItems = [
    { key: 'command', title: 'Command', isKey: true },
    { key: 'value', title: 'Value' },
    {
      key: 'edit',
      title: 'Edit',
      action: handleEdit,
    },
    {
      key: 'delete',
      title: 'Delete',
      action: handleDelete,
    },
  ];

  return (
    <>
      <Flex direction="column" alignItems="flex-end" pb="2">
        <Button onClick={onOpen} colorScheme="purple">
          Add
        </Button>
        <Table headers={HEADERS} items={requestList} />
      </Flex>
      <CommandDialogForm
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        onSave={handleSave}
      />
    </>
  );
}

export default Commands;
