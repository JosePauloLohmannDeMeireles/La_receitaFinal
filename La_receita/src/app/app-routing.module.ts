import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/receita/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'logar',
    pathMatch: 'full'
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./view/receita/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./view/receita/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'detalhes',
    loadChildren: () => import('./view/receita/detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {
    path: 'logar',
    loadChildren: () => import('./view/usuario/logar/logar.module').then( m => m.LogarPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./view/usuario/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
