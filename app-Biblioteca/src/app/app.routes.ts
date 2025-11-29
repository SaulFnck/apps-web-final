import { Routes } from '@angular/router';

//Componentes
import { Home } from './Pages/home/home';
import { LibrosList } from './Pages/libros-list/libros-list';
import { ClientesList } from './Pages/clientes-list/clientes-list';
import { RentasList } from './Pages/rentas-list/rentas-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'libros', component: LibrosList },
  { path: 'clientes', component: ClientesList },
  { path: 'rentas', component: RentasList },

  { path: '**', redirectTo: '' },
];
