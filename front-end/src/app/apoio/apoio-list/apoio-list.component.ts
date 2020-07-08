import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { ApoioService } from './../apoio.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-apoio-list',
  templateUrl: './apoio-list.component.html',
  styleUrls: ['./apoio-list.component.scss']
})
export class ApoioListComponent implements OnInit {

  apoios: any = []

  displayedColumns : string[] = ["nome", "texto", "editar", "excluir"]

  constructor(
    private apoioSrv: ApoioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.apoios = await this.apoioSrv.listar()
    console.log(this.apoios)
  }

  async excluirItem(id: string){
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: "Deseja realmente excluir esse item?"}
    })

    let result = await dialogRef.afterClosed().toPromise();

    if(result){
      try{
        await this.apoioSrv.excluir(id)
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

}
