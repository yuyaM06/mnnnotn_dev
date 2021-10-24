export interface RootState {
  // getCatReducer: CatState
  postProductReducer: ProductState
}

export interface CatState {
  status: string,
  url: string,
  lastUpdated: Number
}

export interface ProductState {
  status: string,
  productShowFlag: boolean  // 画面表示切り替え用フラグ
  prodID: Number,
  prodName: string,
  description: string,
  price: Number,
  figURL: string,
  date: string,
  calory: Number,
  protein: Number,
  lipid: Number,
  carbonhydrates: Number,
  sugar: Number,
  fiber: Number,
  scequiv: Number,
  region: Array<string>,
  allergy: Array<string>,
  lastUpdated: Number
}
