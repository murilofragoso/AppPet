import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { MensagemService } from './../mensagem.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mensagem-list',
  templateUrl: './mensagem-list.component.html',
  styleUrls: ['./mensagem-list.component.scss']
})
export class MensagemListComponent implements OnInit {

  mensagens: any = []

  idUsuario: string

  displayedColumns : string[] = ["texto", "grauFelicidade", "editar", "excluir"]

  constructor(
    private msgSrv: MensagemService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private actRoute:ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    let params = this.actRoute.snapshot.params

    if(params['idUsuario']){
      this.mensagens = await this.msgSrv.listarUsuario(params['idUsuario'])
      this.idUsuario = params['idUsuario']
    }else{
      this.mensagens = await this.msgSrv.listar()
    }
    
    console.log(this.mensagens)
  }

  async excluirItem(id: string){
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: "Deseja realmente excluir esse item?"}
    })

    let result = await dialogRef.afterClosed().toPromise();

    if(result){
      try{
        await this.msgSrv.excluir(id)
        this.ngOnInit() // atualizar os dados da tabela
        //alert('Exclusão efetuada com sucesso')
        this.snackBar.open('Exclusão efetuada com sucesso', 'Entendi', 
          { duration: 5000 });
        
      }
      catch(erro){
        //alert('ERRO: não foi possivel excluir este item.');
        this.snackBar.open('ERRO: não foi possivel excluir este item.', 'Que pena!', 
          { duration: 5000 });
      }
    }
  }

  novaMensagem(){
    this.router.navigate(['/mensagem/novo', {idUsuario: this.idUsuario}]);
  }

}
