import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public lista = [];
  public nome;

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController) { }

  adicionar() {
    if (this.nome == undefined) {
      this.exibeAlert('O campo não pode ser vazio')
    } else {
      let item = this.nome;
      const index = this.getIndex(item)
      if (index == -1) {
        this.lista.push(item.toUpperCase());
        this.exibeToast('"' + item + '" adicionado na lista.');
        this.nome = undefined
      } else {
        this.exibeAlert("'"+item+"' já se encontra na lista.")
      }
    }
  }

  remover = function (item) {
    const index = this.getIndex(item)
    this.lista.splice(index, 1);
    this.exibeToast("'" + item + "' removido da lista.");
  };

  getIndex = function (item) {
    return this.lista.indexOf(item.toUpperCase());;
  }

  async exibeAlert(msg) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atenção',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async exibeToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
