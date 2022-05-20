import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export type HeaderItem = {
  key: string;
  title: string;
  action?: Function;
  isKey?: boolean;
};
export type HeaderItems = Array<HeaderItem>;

function CemTable({
  headers,
  items,
}: {
  headers: any;
  items: any;
}) {
  const titleKeys = headers.filter(
    (key: any) => !key.action,
  );
  const actions = headers.filter((key: any) => key.action);

  const { key: keyId } = headers.find(
    (header: any) => header.isKey,
  );

  const headerItems = [
    ...titleKeys,
    ...(actions && [{ key: 'actions', title: '' }]),
  ];

  return (
    <Table
      variant="striped"
      colorScheme="purple"
      className="min-w-full"
    >
      <Thead>
        <Tr>
          {headerItems.map((item: any) => (
            !item.hidden && (<Th key={item.key} scope="col">{item.title}</Th>)
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item: any) => (
          <Tr key={item[keyId]}>
            {titleKeys.map((key: any) => (
              !key.hidden && (<Td key={`${key.key}-${item[keyId]}`}>{item[key.key]}</Td>)
            ))}
            {actions.length > 0 && (
              <Td>
                <Flex>
                  {actions.map(
                    (action: any, index: number) => (
                      <Box
                        role="button"
                        tabIndex={index}
                        key={`${action.action}-${item[keyId]}`}
                        onClick={() => action.action(item[keyId])}
                        px="2"
                      >
                        {action.title}
                      </Box>
                    ),
                  )}
                </Flex>
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default CemTable;
