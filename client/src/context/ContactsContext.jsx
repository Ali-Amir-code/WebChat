import { createContext, useState } from 'react';

export const ContactsContext = createContext();

/**
 * Provides the contacts context to its children. The context contains
 * the contacts data and a function to update the contacts.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {React.ReactElement}
 */
export const ContactsProvider = ({ children }) => {
 const [contacts, setContacts] = useState([]);

 return (
   <ContactsContext.Provider value={{ contacts, setContacts }}>
     {children}
   </ContactsContext.Provider>
 );
};
