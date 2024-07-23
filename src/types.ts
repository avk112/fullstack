export interface IDragCart {
  coordTop: number;
  coordBottom: number;
  coordLeft: number;
  coordRight: number;
}

export interface ICoords {
  dragCart: IDragCart;
  tasks: any[];
}
