import { useContext } from "react";
import {NotificationsContext} from '../context/NotificationsContext'
/**
 * Hook to access the notifications context, which contains the notifications
 * data and a function to update the notifications. This hook must be used
 * within a NotificationsProvider.
 *
 * @returns {{notifications: Object[], setNotifications: Function}} The
 * notifications context, which contains the notifications data and a function
 * to update the notifications.
 */

const useNotifications = () => {
 const context = useContext(NotificationsContext);
 if (!context) {
   throw new Error('useNoticfications must be used within a NotificationsProvider');
 }
 return context;
};

export {useNotifications};