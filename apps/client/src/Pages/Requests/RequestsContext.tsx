import {
  createContext,
  useContext,
  useReducer,
} from 'react';

const SET_REQUESTS = 'SET_REQUESTS';

export type RequestType = {
  id: string;
  user: string;
  value: string;
  checked: boolean;
};

export type RequestContextType = {
  requests: Array<RequestType>;
  setRequests: Function;
};

const initialContext = {
  requests: [],
  showDialog: false,
};

export const RequestContext = createContext(null);
RequestContext.displayName = 'RequestContext';

export function useRequestContext(): RequestContextType {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error(
      'useRequestContext needs to be used in a RequestProvider',
    );
  }

  return context;
}

function RequestReducer(state: any, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_REQUESTS: {
      return {
        ...state,
        requests: payload,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

export function RequestProvider(props: any) {
  const [state, dispatch] = useReducer(
    RequestReducer,
    initialContext,
  );

  const setRequests = (requests: any) => dispatch({ type: SET_REQUESTS, payload: requests });

  const value = {
    ...state,
    setRequests,
  };

  return (
    <RequestContext.Provider value={value} {...props} />
  );
}
