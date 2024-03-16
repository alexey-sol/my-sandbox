export class ContextOutsideProviderError extends Error {
  public constructor (public message = 'The context must be used within the provider') {
    super(message);
  }
}
