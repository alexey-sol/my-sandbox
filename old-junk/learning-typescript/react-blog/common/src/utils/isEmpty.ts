import IIndexer from "Types/IIndexer";

// If the object is empty (has no own properties), return true. Otherwise,
// returns false.

const isEmpty: (object: IIndexer<any>) => boolean =

  function(object: IIndexer<any>): boolean {
    return !Object.keys(object).length;
  };

export default isEmpty;