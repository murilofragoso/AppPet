import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  title: string = 'Novo Usuario'

  usuario: any = {}

  constructor(
    private usuarioSrv: UsuarioService,
    private snackBar  : MatSnackBar,
    private router : Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    let params = this.actRoute.snapshot.params

    if(params['id']){
      try{
        this.usuario = await this.usuarioSrv.obterUm(params['id'])
        this.title = 'Atualizando usuario'
      }
      catch(erro){
        this.snackBar.open(erro, 'Que Pena!', { duration: 5000})
      }
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
      this.router.navigate(['/usuario']); // Retorna à listagem
    }

  }

  async salvar(form: NgForm){
    if(form.valid){
      try{

        let msg  = 'Usuario atualizado com sucesso.';
        
        if(this.usuario._id){
          await this.usuarioSrv.atualizar(this.usuario)
        }else{
          await this.usuarioSrv.novo(this.usuario)
          msg = 'Usuario criado com sucesso.'
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 5000});
        
        this.router.navigate(['/usuario'])
      }
      catch(erro){
        console.log(this.usuario);
        console.log(erro)
        this.snackBar.open(erro.message, 'Que pena!',  {duration: 5000})
      }
    }
  }

}
