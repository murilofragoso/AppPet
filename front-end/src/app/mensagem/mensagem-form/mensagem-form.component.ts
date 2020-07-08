import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { MensagemService } from './../mensagem.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mensagem-form',
  templateUrl: './mensagem-form.component.html',
  styleUrls: ['./mensagem-form.component.scss']
})
export class MensagemFormComponent implements OnInit {

  title: string = 'Nova mensagem'

  mensagem: any = {}
  idUsuario: string

  constructor(
    private snackBar : MatSnackBar,
    private router : Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private mensagemSrv: MensagemService
  ) { }

  async ngOnInit() {
    let params = this.actRoute.snapshot.params

    if(params['id']) {
      try {
        this.mensagem = await this.mensagemSrv.obterUm(params['id'])
        this.title = 'Atualizando mensagem'
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }else if(params['idUsuario']){
      this.mensagem.usuario = params['idUsuario']
      this.idUsuario = params['idUsuario']
    }else{
      this.snackBar.open('Usuário não encontrado', 'Que pena!', {duration: 5000})
    }
    console.log(this.mensagem)
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
      this.router.navigate(['/mensagem', {idUsuario: this.idUsuario}]); // Retorna à listagem
    }

  }

  async salvar(form: NgForm){
    if(form.valid){
      try{

        let msg  = 'Mensagem atualizada com sucesso.';
        
        if(this.mensagem._id){
          await this.mensagemSrv.atualizar(this.mensagem)
        }else{
          await this.mensagemSrv.novo(this.mensagem)
          msg = 'Mensagem criada com sucesso.'
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 5000});
        
        this.router.navigate(['/mensagem', {idUsuario: this.idUsuario}])
      }
      catch(erro){
        console.log(this.mensagem);
        console.log(erro)
        this.snackBar.open(erro.message, 'Que pena!',  {duration: 5000})
      }
    }
  }

}
