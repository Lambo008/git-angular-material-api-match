export interface SummaryType {
  date: string;
  aus: string;
  atr: string;
}

export interface TotalType {
  TOTAL: string;
  TASA: string;
}

export interface TotalType1 { // unchecked table data type : the length of rate < 7 (default)
  Factura:string,
  CUPS:string,
  Tarifa:string,
  CIF:string,
  Nombre:string,
  Fecha:string,
  Consumo:string,
  Precio:string,
  ATR:string,
  Total:string,
  Total_ATR:string,
  Consumo1:string,
  Precio1:string,
  ATR1:string,
  Total1:string,
  Total_ATR1:string,
  Consumo2:string,
  Precio2:string,
  ATR2:string,
  Total2:string,
  Total_ATR2:string,
  Aiq:number,
  Otros: number,
  Subt:number,
  Impuestos:number,
  Total3:number,
  CofFac:number
}

export interface TotalType2 { // unchecked table data type : the length of rate >= 7 
  Factura:string,
  CUPS:string,
  Tarifa:string,
  CIF:string,
  Nombre:string,
  Fecha:string,
  Consumo:string,
  Precio:string,
  ATR:string,
  Total:string,
  Total_ATR:string,
  Consumo1:string,
  Precio1:string,
  ATR1:string,
  Total1:string,
  Total_ATR1:string,
  Consumo2:string,
  Precio2:string,
  ATR2:string,
  Total2:string,
  Total_ATR2:string,
  Consumo3:string,
  Precio3:string,
  ATR3:string,
  Total3:string,
  Total_ATR3:string,
  Consumo4:string,
  Precio4:string,
  ATR4:string,
  Total4:string,
  Total_ATR4:string,
  Consumo5:string,
  Precio5:string,
  ATR5:string,
  Total5:string,
  Total_ATR5:string,
  Aiq:number,
  Otros: number,
  Subt:number,
  Impuestos:number,
  Total6:number,
  CofFac:number
}
