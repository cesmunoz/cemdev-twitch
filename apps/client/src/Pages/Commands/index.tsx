import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { createOne, deleteOne, getAll } from '../../api/entity';
import {
  CommandsProvider,
  useCommandsContext,
} from './CommandsContext';
import CommandsList from './CommandsList';
import CommandDialogForm from './CommandDialogForm';

function CommandsContainer() {
  const toast = useToast();

  const {
    commands,
    setCommands,
    openCommandsDialog,
    showDialog,
    addCommand,
    removeCommand,
  } = useCommandsContext();

  useEffect(() => {
    getAll('commands-get').then((response: any) => {
      setCommands(response);
    });
  }, []);

  const handleOpen = () => openCommandsDialog(true);
  const handleClose = () => openCommandsDialog(false);

  const handleSave = (model: any) => {
    createOne('commands-post', model).then((response) => {
      addCommand(response);
      openCommandsDialog(false);
      toast({
        title: 'Command created Successfully.',
        description:
          'Now the command can be use by the bot.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    });
  };

  const handleEdit = (id: string) => {
    console.log('Handle Edit', id);
  };

  const handleDelete = (id: string) => {
    deleteOne(`commands-delete?command=${id}`).then(() => {
      removeCommand(id);
      toast({
        title: 'Command deleted Successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    });
  };

  return (
    <>
      <CommandsList
        commands={commands}
        onOpen={handleOpen}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CommandDialogForm
        onClose={handleClose}
        isOpen={showDialog}
        onSave={handleSave}
      />
    </>
  );
}

function Commands() {
  return (
    <CommandsProvider>
      <CommandsContainer />
    </CommandsProvider>
  );
}

export default Commands;
