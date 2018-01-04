import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  tabBarElement: any;

  constructor(
    public navCtrl: NavController,  
    private barcodeScanner: BarcodeScanner
    ) {
    
  }
 
  barcodescan() {
   

    this.barcodeScanner.scan().then((barcodeData) => {
    
      alert('สามารถเชื่อมต่อได้ ');

     
      alert("type "+barcodeData.format+ " data "+barcodeData.text);

     
    }, (err) => {
      alert('ไม่สามารถเชื่อมต่อได้ _ '+err);
     
    });
  }



 

}
