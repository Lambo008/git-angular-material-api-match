export interface ConcertData {
  base: number;
  potencia: number;
  activa: number;
  reactiva: number;
  ie: number;
  otros: number;
  alquiler: number;
  alq_diario: number;
  dias: number;
  desde: string;
  hasta: string;
}

export interface DatosData {
  fechainiciomesconsumo: string;
  fechafinmesconsumo: string;
  diff: number;
  codigotarifaatr: number;
  consumoenergiaactivaenwhp1: number;
  consumoenergiaactivaenwhp2: number;
  consumoenergiaactivaenwhp3: number;
  consumoenergiaactivaenwhp4: number;
  consumoenergiaactivaenwhp5: number;
  consumoenergiaactivaenwhp6: number;
  potenciademandadaenwp1: number;
  potenciademandadaenwp2: number;
  potenciademandadaenwp3: number;
  potenciademandadaenwp4: number;
  potenciademandadaenwp5: number;
  potenciademandadaenwp6: number;
  consumoenergiareactivaenvarhp1: number;
  consumoenergiareactivaenvarhp2: number;
  consumoenergiareactivaenvarhp3: number;
  consumoenergiareactivaenvarhp4: number;
  consumoenergiareactivaenvarhp5: number;
  consumoenergiareactivaenvarhp6: number;
  reactiva: number;
}

export interface SipsData {
  'CUPS': string;
  'Fecha Alta Suministro': string;
  'Fecha ultimo cambio Comercializador': string;
  'Tarifa': number;
  'Tension': number;
  'Potencia contratada P1': number;
  'Potencia contratada P2': number;
  'Potencia contratada P3': number;
  'Potencia contratada P4': number;
  'Potencia contratada P5': number;
  'Potencia contratada P6': number;
  'Potencia maxima BIE': number;
  'Derechos de acceso': number;
  'Derechos de extension': number;
  'Direccion': string;
  'ID Comercializadora': number;
  'Comercializadora': string;
}

export interface TitularData {
  'Documento': string;
  'Nombre y Apellido': string;
  'Direccion': string;
  'Codigo Postal': string;
  'Telefono': string;
}

export interface EstudioData {
  ConsumoAnual: number;
  'Dias de estudio': number;
  'Consumo Per': string;
  'Potencias Opt': string;
  'Precios': string;
}

export interface ResumenData {
  Diastotales: number;
  'Consumo P1': number;
  'Consumo P2': number;
  'Consumo P3': number;
  'Consumo P4': number;
  'Consumo P5': number;
  'Consumo P6': number;
  'Consumo Total': number;
  'Consumo Medio P1': string;
  'Consumo Medio P2': string;
  'Consumo Medio P3': string;
  'Consumo Medio P4': string;
  'Consumo Medio P5': string;
  'Consumo Medio P6': string;
  'Reactiva Total': string;
}
