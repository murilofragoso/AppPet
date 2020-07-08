import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiposPetService } from './../tipos-pet.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipos-pet-list',
  templateUrl: './tipos-pet-list.component.html',
  styleUrls: ['./tipos-pet-list.component.scss']
})
export class TiposPetListComponent implements OnInit {

  tiposPet: any = []

  displayedColumns : string[] = ["especie", "cor", "editar", "excluir"]

  constructor(
    private tiposPetSrv: TiposPetService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.tiposPet = await this.tiposPetSrv.listar()
  }

  async excluirItem(id: string){
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: "Deseja realmente excluir esse item?"}
    })

    let result = await dialogRef.afterClosed().toPromise();

    if(result){
      try{
        await this.tiposPetSrv.excluir(id)
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
