import { useEffect } from 'react';
import { createOne, getAll } from '../../api/entity';
import {
  CommandsProvider,
  useCommandsContext,
} from './CommandsContext';
import CommandsList from './CommandsList';
import CommandDialogForm from './CommandDialogForm';

function CommandsContainer() {
  const {
    commands,
    setCommands,
    openCommandsDialog,
    showDialog,
    addCommand,
  } = useCommandsContext();

  useEffect(() => {
    getAll('commands-get').then((response: any) => setCommands(response));
  }, [setCommands]);

  const handleOpen = () => openCommandsDialog(true);
  const handleClose = () => openCommandsDialog(false);

  const handleSave = (model: any) => {
    createOne('commands-post', model).then((response) => addCommand(response));
  };

  return (
    <>
      <CommandsList
        commands={commands}
        onOpen={handleOpen}
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
