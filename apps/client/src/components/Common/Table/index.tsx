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

  const headerItems = [
    ...titleKeys,
    ...(actions && [{ key: 'actions', title: '' }]),
  ];

  return (
    <Table
      variant="striped"
      colorScheme="teal"
      className="min-w-full">
      <Thead>
        <Tr>
          {headerItems.map((item: any) => (
            <Th key={item.key} scope="col">
              {item.title}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item: any) => (
          <Tr key={item.id}>
            {titleKeys.map((key: any) => (
              <Td key={`${item.id}-${key.key}`}>
                {item[key.key]}
              </Td>
            ))}
            {actions.length > 0 && (
              <Td>
                <Flex>
                  {actions.map(
                    (action: any, index: number) => (
                      <Box
                        role="button"
                        tabIndex={index}
                        key={`${action.action}-${item.id}`}
                        onClick={() =>
                          action.action(item.id)
                        }
                        px="2">
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
