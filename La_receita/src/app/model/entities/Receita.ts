export class Receita{
 private _id!: string;
 private _nome: string;
 private _ingrediente: string[];
 private _preparo!: string;
 private _criador!: string;
 private _tipo!: number;
 private _image!: any;
 private _uid! : string;
 private _historia!: string;

 constructor(nome: string, ingrediente: string[], preparo: string){
  this._nome = nome;
  this._ingrediente = ingrediente;
 this._preparo = preparo;
 }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }


  public get nome() : string{
    return this._nome;
  }

  public set nome(nome: string){
    this._nome = nome;
  }

  public get image(): any {
    return this._image;
  }
  public set image(image: any) {
      this._image = image;
  }

  //criador
  public get criador() : string{
    return this._criador;
  }
  public set criador(criador: string){
    this._criador = criador;
  }

  //hitoria
  public get historia() : string{
    return this._historia;
  }
  public set historia(historia: string){
    this._historia = historia;
  }

  //preparo
  public get preparo() : string{
    return this._preparo;
  }
  public set preparo(preparo: string){
    this._preparo = preparo;
  }

  //ingredientes
  public get ingrediente(): string[] {
    return this._ingrediente;
  }
  public set ingrediente(ingrediente: string[]) {
    this._ingrediente = ingrediente;
  }

  //tipo
  public get tipo(): number {
      return this._tipo;
  }
  public set tipo(value: number) {
      this._tipo = value;
  }

  public get uid(): string {
    return this._uid;
  }
  public set uid(value: string) {
    this._uid = value;
  }


}
