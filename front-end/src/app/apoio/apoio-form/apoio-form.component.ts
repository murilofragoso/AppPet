import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { ApoioService } from './../apoio.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-apoio-form',
  templateUrl: './apoio-form.component.html',
  styleUrls: ['./apoio-form.component.scss']
})
export class ApoioFormComponent implements OnInit {

  title: string = 'Novo apoio'

  apoio: any = {}

  constructor(
    private apoioSrv: ApoioService,
    private snackBar  : MatSnackBar,
    private router : Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    let params = this.actRoute.snapshot.params

    if(params['id']){
      try{
        this.apoio = await this.apoioSrv.obterUm(params['id'])
        this.title = 'Atualizando apoio'
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
      this.router.navigate(['/apoio']); // Retorna à listagem
    }

  }

  async salvar(form: NgForm){
    if(form.valid){
      try{

        let msg  = 'apoio atualizado com sucesso.';
        
        if(this.apoio._id){
          await this.apoioSrv.atualizar(this.apoio)
        }else{
          await this.apoioSrv.novo(this.apoio)
          msg = 'apoio criado com sucesso.'
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 5000});
        
        this.router.navigate(['/apoio'])
      }
      catch(erro){
        console.log(this.apoio);
        console.log(erro)
        this.snackBar.open(erro.message, 'Que pena!',  {duration: 5000})
      }
    }
  }

}
