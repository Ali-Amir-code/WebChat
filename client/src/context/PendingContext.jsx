import { createContext, useState } from 'react';

export const PendingContext = createContext();

/**
 * Provides the pending requests context to its children. The context contains
 * the pending requests data and a function to update the pending requests.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {React.ReactElement}
 */
export const PendingProvider = ({ children }) => {
 const [pendingRequests, setPendingRequests] = useState([]);

 return (
   <PendingContext.Provider value={{ pendingRequests, setPendingRequests }}>
     {children}
   </PendingContext.Provider>
 );
};
