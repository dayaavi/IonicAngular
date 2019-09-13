import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    // La ruta de que indicamos en el boton para usar la funcion definida en tab1.ts, la ruta es esta tabs/tab1/agregar
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          },
          // Aqui agreagamos el path q estaba en app.routing.module.ts, solo debemos cambiar la nueva ruta,
          // Los 2 .. indica q al ya estar en la carpeta pages, regresa 1 carpeta y vuelve a entrer a la carpeta pages
          {
            // path: 'agregar/:listaId',
            // loadChildren: '../agregar/agregar.module#AgregarPageModule'

            path: 'agregar/:listaId',
            loadChildren: () =>
            import('../agregar/agregar.module').then(m => m.AgregarPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
