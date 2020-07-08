import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { TiposPetService } from './../tipos-pet.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tipos-pet-form',
  templateUrl: './tipos-pet-form.component.html',
  styleUrls: ['./tipos-pet-form.component.scss']
})
export class TiposPetFormComponent implements OnInit {

  title: string = 'Novo tipo de pet'

  tipoPet: any = {}

  constructor(
    private tiposPetSrv: TiposPetService,
    private snackBar  : MatSnackBar,
    private router : Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    let params = this.actRoute.snapshot.params

    if(params['id']){
      try{
        this.tipoPet = await this.tiposPetSrv.obterUm(params['id'])
        this.title = 'Atualizando tipo de pet'
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
      this.router.navigate(['/tipos-pet']); // Retorna à listagem
    }

  }

  async salvar(form: NgForm){
    if(form.valid){
      try{

        let msg  = 'Tipo de pet atualizado com sucesso.';
        
        if(this.tipoPet._id){
          await this.tiposPetSrv.atualizar(this.tipoPet)
        }else{
          await this.tiposPetSrv.novo(this.tipoPet)
          msg = 'Tipo de pet criado com sucesso.'
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 5000});
        
        this.router.navigate(['/tipos-pet'])
      }
      catch(erro){
        console.log(this.tipoPet);
        console.log(erro)
        this.snackBar.open(erro.message, 'Que pena!',  {duration: 5000})
      }
    }
  }

}
