import { createContext, useState } from 'react';

export const NotificationsContext = createContext();

/**
 * Provides the notifications context to its children. The context contains
 * the notifications data and a function to update the notifications.
 *
 * @param {{ children: React.ReactNode }} props - The children components
 * that will have access to the notifications context.
 * @returns {React.ReactElement} A context provider component that supplies
 * the notifications state and updater function to its children.
 */

export const NotificationsProvider = ({ children }) => {
 const [notifications, setNotifications] = useState([]);

 return (
   <NotificationsContext.Provider value={{ notifications, setNotifications }}>
     {children}
   </NotificationsContext.Provider>
 );
};
