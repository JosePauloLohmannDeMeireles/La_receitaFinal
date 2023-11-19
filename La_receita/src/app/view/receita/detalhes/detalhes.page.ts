import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Receita } from 'src/app/model/entities/Receita';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  nome! : string;
  ingrediente! : string[];
  preparo! : string;
  criador! : string;
  tipo!: number;
  image! : any;
  receita! : Receita;
  edicao: boolean = true;
  user : any;
  historia! : string;
  novoIngrediente: string = '';
  ingredientes: string[] = [];


  constructor(private firebase : FirebaseService,
    private alertController: AlertController,
    private auth : AuthService,
    private router: Router) {
      this.user = this.auth.getUsuarioLogado();
    }

  ngOnInit() {
    this.receita = history.state.receita;
    this.nome = this.receita.nome;
    this.ingrediente = this.receita.ingrediente;
    this.preparo = this.receita.preparo;
    this.criador = this.receita.criador;
    this.tipo = this.receita.tipo;
    this.image = this.receita.downloadURL;
    this.historia = this.receita.historia;
    this.ingrediente = this.receita.ingrediente;
  }

  excluir(){
    this.presentConfirmAlert("ATENÇÃO", "Deseja realmente excluir a receita?");
  }

  //firebase deploy

  excluirReceita(){
    this.firebase.excluir(this.receita.id)
    .then(() => { this.router.navigate(["/home"]);})
    .catch((error)=>{
      console.log(error);
      this.presentAlert("Erro", "Erro ao Excluir receita!");
    })

  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Receita',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Receita',
      subHeader: subHeader,
      message: message,
      buttons: [
        {text: 'Cancelar', role: 'cancelar', handler: ()=>{console.log("cancelou")}},
        {text: 'Confirmar', role: 'confirmar', handler: (acao)=>{this.excluirReceita()}}
      ],
    });
    await alert.present();
  }

  editar(receita :  Receita){
    this.router.navigateByUrl("/editar", {state : { receita: receita}});
  }

}
