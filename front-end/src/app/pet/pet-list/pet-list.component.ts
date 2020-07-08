import { PetService } from './../pet.service';
import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {

  pets: any = []

  displayedColumns : string[] = ["nome", "tipo", "usuario", "editar", "excluir"]

  constructor(
    private petSrv: PetService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.pets = await this.petSrv.listar()
    console.log(this.pets)
  }

  async excluirItem(id: string){
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: "Deseja realmente excluir esse item?"}
    })

    let result = await dialogRef.afterClosed().toPromise();

    if(result){
      try{
        await this.petSrv.excluir(id)
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
