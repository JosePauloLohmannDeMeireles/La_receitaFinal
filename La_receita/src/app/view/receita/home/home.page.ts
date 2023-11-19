import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Receita } from 'src/app/model/entities/Receita';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  public listaDeReceitas : Receita[] = [];
  receitasFiltradas: Receita[] = [];

  constructor(private alertController: AlertController,
    private router : Router,
    private auth: AuthService,
    private firebase : FirebaseService) {
      console.log(this.auth.getUsuarioLogado());
      this.firebase.buscarTodos()
      .subscribe(res => {
        this.listaDeReceitas = res.map(receitas => {
          return{
            id: receitas.payload.doc.id,
            ...receitas.payload.doc.data() as any
          }as Receita
        })
      })
    }

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  editar(receita :  Receita){
    this.router.navigateByUrl("/detalhes", {state : { receita: receita}});
  }

  ionViewWillEnter() {
    this.receitasFiltradas = [...this.listaDeReceitas];
  }
  
  filtrarReceitas(event: any) {
    const nome: string = event.target.value || '';

    if (nome.trim() === '') {

      this.receitasFiltradas = [...this.listaDeReceitas];
    } else {
      this.receitasFiltradas = this.listaDeReceitas.filter((receita) =>
        receita.nome.toLowerCase().includes(nome.toLowerCase())
      );
    }
  }
}
