// Describes an arbitrary object which may have an arbitrary number of
// properties of "Type" type.

export default interface IIndexer<Type> {
  [ key: string ]: Type;
}