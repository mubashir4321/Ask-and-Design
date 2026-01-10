import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  user: null,
  conversations: [],
  designs: [],
  currentConversation: null,
  currentDesign: null,
  isLoading: false,
  notifications: []
};

// Action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  ADD_CONVERSATION: 'ADD_CONVERSATION',
  UPDATE_CONVERSATION: 'UPDATE_CONVERSATION',
  DELETE_CONVERSATION: 'DELETE_CONVERSATION',
  SET_CURRENT_CONVERSATION: 'SET_CURRENT_CONVERSATION',
  ADD_DESIGN: 'ADD_DESIGN',
  UPDATE_DESIGN: 'UPDATE_DESIGN',
  DELETE_DESIGN: 'DELETE_DESIGN',
  SET_CURRENT_DESIGN: 'SET_CURRENT_DESIGN',
  SET_LOADING: 'SET_LOADING',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    
    case ActionTypes.ADD_CONVERSATION:
      return {
        ...state,
        conversations: [...state.conversations, action.payload]
      };
    
    case ActionTypes.UPDATE_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.map(conv => 
          conv.id === action.payload.id ? action.payload : conv
        )
      };
    
    case ActionTypes.DELETE_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.filter(conv => conv.id !== action.payload),
        currentConversation: state.currentConversation?.id === action.payload ? null : state.currentConversation
      };
    
    case ActionTypes.SET_CURRENT_CONVERSATION:
      return {
        ...state,
        currentConversation: action.payload
      };
    
    case ActionTypes.ADD_DESIGN:
      return {
        ...state,
        designs: [...state.designs, action.payload]
      };
    
    case ActionTypes.UPDATE_DESIGN:
      return {
        ...state,
        designs: state.designs.map(design => 
          design.id === action.payload.id ? action.payload : design
        )
      };
    
    case ActionTypes.DELETE_DESIGN:
      return {
        ...state,
        designs: state.designs.filter(design => design.id !== action.payload),
        currentDesign: state.currentDesign?.id === action.payload ? null : state.currentDesign
      };
    
    case ActionTypes.SET_CURRENT_DESIGN:
      return {
        ...state,
        currentDesign: action.payload
      };
    
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now() }]
      };
    
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const setUser = (user) => {
    dispatch({ type: ActionTypes.SET_USER, payload: user });
  };

  const addConversation = (conversation) => {
    dispatch({ type: ActionTypes.ADD_CONVERSATION, payload: conversation });
  };

  const updateConversation = (conversation) => {
    dispatch({ type: ActionTypes.UPDATE_CONVERSATION, payload: conversation });
  };

  const deleteConversation = (id) => {
    dispatch({ type: ActionTypes.DELETE_CONVERSATION, payload: id });
  };

  const setCurrentConversation = (conversation) => {
    dispatch({ type: ActionTypes.SET_CURRENT_CONVERSATION, payload: conversation });
  };

  const addDesign = (design) => {
    dispatch({ type: ActionTypes.ADD_DESIGN, payload: design });
  };

  const updateDesign = (design) => {
    dispatch({ type: ActionTypes.UPDATE_DESIGN, payload: design });
  };

  const deleteDesign = (id) => {
    dispatch({ type: ActionTypes.DELETE_DESIGN, payload: id });
  };

  const setCurrentDesign = (design) => {
    dispatch({ type: ActionTypes.SET_CURRENT_DESIGN, payload: design });
  };

  const setLoading = (isLoading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading });
  };

  const addNotification = (notification) => {
    dispatch({ type: ActionTypes.ADD_NOTIFICATION, payload: notification });
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: notification.id });
    }, 5000);
  };

  const removeNotification = (id) => {
    dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
  };

  return (
    <AppContext.Provider value={{
      ...state,
      setUser,
      addConversation,
      updateConversation,
      deleteConversation,
      setCurrentConversation,
      addDesign,
      updateDesign,
      deleteDesign,
      setCurrentDesign,
      setLoading,
      addNotification,
      removeNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};