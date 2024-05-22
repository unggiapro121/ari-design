/**
 * Very basic server detection
*/
export const isServer = (typeof window === 'undefined' || typeof window?.document === 'undefined');
/**
 * Very simple browser detection
 */
export const isClient = !isServer;

export default {
  isClient,
  isServer,
};
