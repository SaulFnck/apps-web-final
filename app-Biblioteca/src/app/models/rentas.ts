export interface Rentas {
  idRenta: number,
  idCliente: number;
  idLibro: number;
  fechaRenta: Date;
  fechaEstimadaDevolucion: Date;
  fechaRealDevolucion: Date;
  estado: Boolean;
}
