import { Inject, Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Receita } from '../entities/Receita';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = "contatos";
  user : any;

  constructor(private firestore : AngularFirestore,
   @Inject(Injector) private readonly injector : Injector,
    private storage : AngularFireStorage) { }

    private injectAuthService(){
     return this.injector.get(AuthService);
    }

  buscarTodos(){
    this.user = this.injectAuthService().getUsuarioLogado();
    return this.firestore.collection(this.PATH,
       ref => ref.where('uid','==', this.user.uid)).snapshotChanges();
  }

  cadastrar(receita: Receita){
    return this.firestore.collection(this.PATH)
    .add({nome : receita.nome, ingrediente: receita.ingrediente,
      preparo: receita.preparo, tipo : receita.tipo,
      downloadURL : receita.image, criador : receita.criador 
      ,uid : receita.uid ,historia: receita.historia});
  }

  editar(receita: Receita, id : string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome : receita.nome, ingrediente: receita.ingrediente,
      preparo: receita.preparo, tipo : receita.tipo,
      downloadURL : receita.image, criador : receita.criador 
      ,uid : receita.uid ,historia: receita.historia});
  }


  excluir(id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .delete();
  }

  uploadImage(imagem: any, receita: Receita){
    
    const file = imagem;
    if(file.type.split('/')[0] !== 'image'){
      console.error("Tipo Não Suportado");
      return;
    }
    const path = `images/${receita.nome}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path,file);
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp => {
          receita.image = resp;
          if(!receita.id){
            this.cadastrar(receita);
          }else{
            this.editar(receita, receita.id);
          }
        })
      })
    ).subscribe();
    return task;
  }

}
