import { useContext } from "react";
import {PendingContext} from '../context/PendingContext'
/**
 * Hook to access the pending requests context, which contains the pending
 * requests data and a function to update the pending requests. This hook must
 * be used within a PendingProvider.
 *
 * @returns {{pendingRequests: Object[], setPendingRequests: Function}} The
 * pending requests context, which contains the pending requests data and a
 * function to update the pending requests.
 */
const usePendingRequests = () => {
 const context = useContext(PendingContext);
 if (!context) {
   throw new Error('usePendingRequests must be used within a PendingProvider');
 }
 return context;
};

export {usePendingRequests};