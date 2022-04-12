import { Button, Flex } from '@chakra-ui/react';
import { Table } from '../../components/Common';
import { HeaderItems } from '../../components/Common/Table';

function CommandsList({
  commands,
  onOpen,
  onEdit,
  onDelete,
}: {
  commands: Array<{ command: string; value: string }>;
  onOpen: any;
  onEdit: Function;
  onDelete: Function;
}) {
  const HEADERS: HeaderItems = [
    { key: 'command', title: 'Command', isKey: true },
    { key: 'value', title: 'Value' },
    {
      key: 'edit',
      title: 'Edit',
      action: onEdit,
    },
    {
      key: 'delete',
      title: 'Delete',
      action: onDelete,
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
