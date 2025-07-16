import { useContext } from "react";
import {ContactsContext} from '../context/ContactsContext'
/**
 * Hook to access the contacts context, which contains the contacts data
 * and a function to update the contacts. This hook must be used within
 * a ContactsProvider.
 *
 * @returns {{contacts: Object[], setContacts: Function}} The contacts
 * context, which contains the contacts data and a function to update the
 * contacts.
 */
const useContacts = () => {
 const context = useContext(ContactsContext);
 if (!context) {
   throw new Error('useContacts must be used within a ContactsProvider');
 }
 return context;
};

export {useContacts};