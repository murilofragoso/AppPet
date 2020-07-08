import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { TiposPetService } from './../../tipos-pet/tipos-pet.service';
import { UsuarioService } from './../../usuario/usuario.service';
import { PetService } from './../pet.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {

  title: string = 'Novo pet'

  pet: any = {}
  tiposPet: any = []
  usuarios: any = []

  constructor(
    private snackBar : MatSnackBar,
    private router : Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private petSrv: PetService,
    private usuarioSrv: UsuarioService,
    private tiposPetSrv: TiposPetService
  ) { }

  async ngOnInit() {
    let params = this.actRoute.snapshot.params

    if(params['id']) {
      try {
        this.pet = await this.petSrv.obterUm(params['id'])
        this.title = 'Atualizando pet'
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }

    // Entidades relacionadas
    try {
      this.usuarios = await this.usuarioSrv.listar()
      this.tiposPet = await this.tiposPetSrv.listar()
    }
    catch(erro) {
      this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})  
    }
  
  }

  async voltar(form: NgForm) {
    
    let result = true;
    console.log(form);
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if(result) {
      this.router.navigate(['/pet']); // Retorna à listagem
    }

  }

  async salvar(form: NgForm){
    if(form.valid){
      try{

        let msg  = 'Pet atualizado com sucesso.';
        
        if(this.pet._id){
          await this.petSrv.atualizar(this.pet)
        }else{
          await this.petSrv.novo(this.pet)
          msg = 'Pet criado com sucesso.'
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 5000});
        
        this.router.navigate(['/pet'])
      }
      catch(erro){
        console.log(this.pet);
        console.log(erro)
        this.snackBar.open(erro.message, 'Que pena!',  {duration: 5000})
      }
    }
  }
}
