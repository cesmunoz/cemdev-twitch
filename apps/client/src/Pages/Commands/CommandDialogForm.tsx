import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

type CommandDialogFormType = {
  isOpen: boolean;
  onClose: Function;
  onSave: Function;
  id: string;
};

function CommandDialogForm({
  isOpen,
  onClose,
  onSave,
  id,
}: CommandDialogFormType) {
  const initialRef = useRef();
  const finalRef = useRef();
  const [command, setCommand] = useState('');
  const [value, setValue] = useState('');

  const handleCommandChange = (e: any) => {
    if (e.target.value === '') {
      setCommand('');
      return;
    }

    const commandNameValue = e.target.value;
    const commandName = commandNameValue.startsWith('!')
      ? commandNameValue.substring(1)
      : commandNameValue;
    setCommand(`!${commandName}`);
  };

  const handleValueChange = (e: any) => setValue(e.target.value);

  const handleSave = () => {
    onSave({
      command,
      value,
    });
    setCommand('');
    setValue('');
  };

  const handleClose = () => {
    setCommand('');
    setValue('');
    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {id ? 'Edit command' : 'Create new command'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Command name</FormLabel>
            <Input
              ref={initialRef}
              placeholder="!discord"
              value={command}
              onChange={handleCommandChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Value</FormLabel>
            <Input
              value={value}
              onChange={handleValueChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CommandDialogForm;
