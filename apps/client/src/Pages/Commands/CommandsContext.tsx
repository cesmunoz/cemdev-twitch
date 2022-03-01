import {
  createContext,
  useContext,
  useReducer,
} from 'react';

const ADD_COMMAND = 'ADD_COMMAND';
const EDIT_COMMAND = 'EDIT_COMMAND';
const REMOVE_COMMAND = 'REMOVE_COMMAND';
const TOGGLE_COMMAND = 'TOGGLE_COMMAND';
const SET_COMMANDS = 'SET_COMMANDS';
const SHOW_DIALOG = 'SHOW_DIALOG';

const initialContext = {
  commands: [],
  showDialog: false,
};

export const CommandsContext = createContext(null);
CommandsContext.displayName = 'CommandsContext';

export function useCommandsContext() {
  const context = useContext(CommandsContext);
  if (!context) {
    throw new Error(
      'useCommandsContext needs to be used in a CommandsProvider',
    );
  }

  return context;
}

const orderCommands = (a: any, b: any) => (a.command > b.command ? 1 : -1);

function CommandsReducer(state: any, action: any) {
  const { type, payload } = action;

  switch (type) {
    case ADD_COMMAND: {
      const list = [...state.commands, payload];

      return {
        ...state,
        commands: list.sort(orderCommands),
      };
    }
    case EDIT_COMMAND: {
      const list = state.commands.filter(
        (command: any) => command.command !== payload.command,
      );
      const newCommandsList = [...list, payload];

      return {
        ...state,
        commands: newCommandsList.sort(orderCommands),
      };
    }
    case REMOVE_COMMAND: {
      const list = state.commands.filter(
        (command: any) => command.command !== payload.command,
      );

      return {
        ...state,
        commands: list,
      };
    }
    case TOGGLE_COMMAND: {
      const list = state.commands.filter(
        (command: any) => command.command !== payload.command,
      );
      const newCommandsList = [...list, payload];

      return {
        ...state,
        commands: newCommandsList.sort(orderCommands),
      };
    }
    case SET_COMMANDS: {
      return {
        ...state,
        commands: payload,
      };
    }
    case SHOW_DIALOG: {
      return {
        ...state,
        showDialog: payload,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

export function CommandsProvider(props: any) {
  // eslint-disable-next-line no-use-before-define
  const addCommand = (command: any) => dispatch({ type: ADD_COMMAND, payload: command });

  // eslint-disable-next-line no-use-before-define
  const editCommand = (command: any) => dispatch({ type: EDIT_COMMAND, payload: command });

  // eslint-disable-next-line no-use-before-define
  const removeCommand = (command: any) => dispatch({ type: REMOVE_COMMAND, payload: command });

  // eslint-disable-next-line no-use-before-define
  const toggleCommand = (command: any) => dispatch({ type: TOGGLE_COMMAND, payload: command });

  // eslint-disable-next-line no-use-before-define
  const setCommands = (command: any) => dispatch({ type: SET_COMMANDS, payload: command });

  const openCommandsDialog = (showDialog: any) => {
    const payload = showDialog;
    // eslint-disable-next-line no-use-before-define
    return dispatch({ type: SHOW_DIALOG, payload });
  };

  const [state, dispatch] = useReducer(CommandsReducer, {
    ...initialContext,
    addCommand,
    editCommand,
    removeCommand,
    toggleCommand,
    setCommands,
    openCommandsDialog,
  });

  return (
    <CommandsContext.Provider value={state} {...props} />
  );
}
