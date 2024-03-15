import IResult from "./IResult";

// Describes a DB controller. In the project, there're 3 controllers:
// processing comments, posts, and users. They all depend on this abstract
// interface (I suppose, is it called "Dependency Invertion"?).

export default interface IController<
  AddingDataType,
  UpdatingDataType,
  ModelType
> {
  add(data: AddingDataType): Promise<ModelType>;
  delete(id: string): Promise<IResult>;
  get(id: string): Promise<ModelType | null>;
  getAll(): Promise<ModelType[]>;
  update(id: string, data: UpdatingDataType): Promise<IResult>;
}