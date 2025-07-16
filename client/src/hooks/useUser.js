import { useContext } from "react";
import {UserContext} from '../context/UserContext'
/**
 * Hook to access the user context, which contains the user data
 * and a function to update the user. This hook must be used within
 * a UserProvider.
 *
 * @returns {{user: Object, setUser: Function}} The user context,
 * which contains the user data and a function to update the user.
 */
const useUser = () => {
 const context = useContext(UserContext);
 if (!context) {
   throw new Error('useUser must be used within a UserProvider');
 }
 return context;
};

export {useUser};