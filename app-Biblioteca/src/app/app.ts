import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

//Componentes Reutilizables
import { NavBar } from './Pages/nav-bar/nav-bar';
import { Footer } from './Pages/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NavBar, Footer],

  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('app-Biblioteca');
}
