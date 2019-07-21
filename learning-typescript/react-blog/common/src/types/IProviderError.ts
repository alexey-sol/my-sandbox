// Describes an error which may be sent from the server to the client if there
// was an error when authenticating. It's used for a Socket.IO event.

export default interface IProviderError {
  error_description: string;
  error: string;
}