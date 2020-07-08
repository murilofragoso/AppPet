import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainToolbarComponent } from './ui/main-toolbar/main-toolbar.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { MainFooterComponent } from './ui/main-footer/main-footer.component';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { TiposPetListComponent } from './tipos-pet/tipos-pet-list/tipos-pet-list.component';
import { TiposPetFormComponent } from './tipos-pet/tipos-pet-form/tipos-pet-form.component';
import { PetListComponent } from './pet/pet-list/pet-list.component';
import { PetFormComponent } from './pet/pet-form/pet-form.component';
import { MensagemListComponent } from './mensagem/mensagem-list/mensagem-list.component';
import { MensagemFormComponent } from './mensagem/mensagem-form/mensagem-form.component';
import { ApoioListComponent } from './apoio/apoio-list/apoio-list.component';
import { ApoioFormComponent } from './apoio/apoio-form/apoio-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainMenuComponent,
    MainFooterComponent,
    UsuarioListComponent,
    ConfirmDlgComponent,
    UsuarioFormComponent,
    TiposPetListComponent,
    TiposPetFormComponent,
    PetListComponent,
    PetFormComponent,
    MensagemListComponent,
    MensagemFormComponent,
    ApoioListComponent,
    ApoioFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
