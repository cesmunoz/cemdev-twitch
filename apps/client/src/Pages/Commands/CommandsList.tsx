import { Button, Flex } from '@chakra-ui/react';
import { Table } from '../../components/Common';
import { HeaderItems } from '../../components/Common/Table';

function CommandsList({
  commands,
  onOpen,
}: {
  commands: any;
  onOpen: any;
}) {
  const handleEdit = (id: any) => {
    // eslint-disable-next-line no-console
    console.log('Handle Approve', id);
  };

  const handleDelete = (id: any) => {
    // eslint-disable-next-line no-console
    console.log('Handle Decline', id);
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
    <Flex direction="column" alignItems="flex-end" pb="2">
      <Button onClick={onOpen} colorScheme="purple">
        Add
      </Button>
      <Table headers={HEADERS} items={commands} />
    </Flex>
  );
}

export default CommandsList;
