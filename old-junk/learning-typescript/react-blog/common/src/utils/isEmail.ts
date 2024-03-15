// Checks if the "string" is a valid email.

const isEmail: (compare: string) => boolean =

  function(compare: string): boolean {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test( String(compare).toLowerCase() );
  };

export default isEmail;
