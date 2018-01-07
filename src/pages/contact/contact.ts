import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,    public loadingCtrl: LoadingController) {
  }

  Loading() {
    let loading = this.loadingCtrl.create({
      content: 'loading ...'
    });
  
    loading.present();
  
    setTimeout(() => {
    
      loading.dismiss();
    }, 500);
  }

  ionViewDidLoad() {
    this.Loading();
    console.log('ionViewDidLoad ContactPage');
  }

}
