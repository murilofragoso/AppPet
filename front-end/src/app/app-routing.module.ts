import { ApoioFormComponent } from './apoio/apoio-form/apoio-form.component';
import { ApoioListComponent } from './apoio/apoio-list/apoio-list.component';
import { MensagemFormComponent } from './mensagem/mensagem-form/mensagem-form.component';
import { MensagemListComponent } from './mensagem/mensagem-list/mensagem-list.component';
import { PetFormComponent } from './pet/pet-form/pet-form.component';
import { PetListComponent } from './pet/pet-list/pet-list.component';
import { TiposPetFormComponent } from './tipos-pet/tipos-pet-form/tipos-pet-form.component';
import { TiposPetListComponent } from './tipos-pet/tipos-pet-list/tipos-pet-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'usuario',
    component: UsuarioListComponent
  },
  {
    path: 'usuario/novo',
    component: UsuarioFormComponent
  },
  {
    path: 'usuario/:id',
    component: UsuarioFormComponent
  },
  {
    path: 'tipos-pet',
    component: TiposPetListComponent
  },
  {
    path: 'tipos-pet/novo',
    component: TiposPetFormComponent
  },
  {
    path: 'tipos-pet/:id',
    component: TiposPetFormComponent
  },
  {
    path: 'pet',
    component: PetListComponent
  },
  {
    path: 'pet/novo',
    component: PetFormComponent
  },
  {
    path: 'pet/:id',
    component: PetFormComponent
  },
  {
    path: 'mensagem',
    component: MensagemListComponent
  },
  {
    path: 'mensagem/novo',
    component: MensagemFormComponent
  },
  {
    path: 'mensagem/:id',
    component: MensagemFormComponent
  },
  {
    path: 'apoio',
    component: ApoioListComponent
  },
  {
    path: 'apoio/novo',
    component: ApoioFormComponent
  },
  {
    path: 'apoio/:id',
    component: ApoioFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
