import { Router } from '@angular/router';
import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  usuarios : any = []

  displayedColumns : string[] = ["nome", "email", "mensagens", "editar", "excluir"]

  constructor(
    private usuarioSrv: UsuarioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  async ngOnInit(){
    this.usuarios = await this.usuarioSrv.listar()
    console.log(this.usuarios)
  }

  async excluirItem(id: string){
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: "Deseja realmente excluir esse item?"}
    })

    let result = await dialogRef.afterClosed().toPromise();

    if(result){
      try{
        await this.usuarioSrv.excluir(id)
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

  async editarItem(senha: string, id: string){
    let senhaInformada = prompt('Informe a senha');

    if(senha == senhaInformada){
      this.router.navigate(['/usuario/', id])
    }else if(senhaInformada){
      alert('Senha incorreta');
    }
  }

  mensagens(senha: string, id: string){
    let senhaInformada = prompt('Informe a senha');

    if(senha == senhaInformada){
      this.router.navigate(['/mensagem', {idUsuario: id}])
    }else if(senhaInformada){
      alert('Senha incorreta');
    }
  }
}
