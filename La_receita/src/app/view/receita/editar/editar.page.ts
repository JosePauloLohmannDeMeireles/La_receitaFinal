import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Receita } from 'src/app/model/entities/Receita';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
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
    this.image = this.receita.image;
    this.historia = this.receita.historia;
    this.ingredientes = this.receita.ingrediente;
  }

  habilitar(){
    if(this.edicao){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  uploadFile(imagem: any){
    this.image = imagem.files;
  }

  editar(){
    if(this.nome && this.ingrediente && this.preparo){
      let novo: Receita = new Receita(this.nome, this.ingrediente, this.preparo);
      novo.preparo = this.preparo;
      novo.tipo = this.tipo;
      novo.id = this.receita.id;
      novo.uid = this.user.uid;
      if(this.image){
        this.firebase.uploadImage(this.image, novo)
        ?.then(()=>{this.router.navigate(["/home"]);})
      }else{
        novo.image = this.receita.image;
        this.firebase.editar(novo, this.receita.id)
        .then(()=>{this.router.navigate(["/home"]);})
        .catch((error)=>{
          console.log(error);
          this.presentAlert("Erro", "Erro ao Atualizar receita!");
        })
      }
    }else{
      this.presentAlert("Erro", "Nome e Telefone são campos Obrigatórios!");
    }
  }

  //firebase deploy

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Lista de Receitas',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  adicioneImagem(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  adicionarIngrediente() {
    if (this.novoIngrediente.trim() !== '') {
      this.ingredientes.push(this.novoIngrediente);
      this.novoIngrediente = ''; // Limpa o campo de entrada
    }
  }

  removerIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
  }

  detalhes(receita :  Receita){
    this.router.navigateByUrl("/detalhes", {state : { receita: receita}});
  }

}
