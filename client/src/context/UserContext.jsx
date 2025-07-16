import { createContext, useState } from 'react';

export const UserContext = createContext();

/**
 * Provides the user context to its children. The context contains
 * the user data and a function to update the user.
 *
 * @param {{ children: React.ReactNode }} props - The children components
 * that will have access to the user context.
 * @returns {React.ReactElement} A context provider component that supplies
 * the user state and updater function to its children.
 */

export const UserProvider = ({ children }) => {
 const [user, setUser] = useState({});

 return (
   <UserContext.Provider value={{ user, setUser }}>
     {children}
   </UserContext.Provider>
 );
};
