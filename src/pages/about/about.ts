import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  public baseURL:string;
  public result_html:string;

  public items0:string[];

  constructor(
    public navCtrl: NavController,
    public http:Http,
    public toastCtrl:ToastController ) {

      this.baseURL='http://27.254.81.49:2894/soon/lottoly_20year.php';

  }
 
  alert_show(text_message) {
    let toast = this.toastCtrl.create({
      message: text_message,
      duration: 5000,
      position: "bottom",
      cssClass: "toast-success"
     
    });
    toast.present();
  }
 
  post_data(){

    
    
    console.log("post abount");
  
     var link = this.baseURL;
 
     var headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded' );
     let options = new RequestOptions({ headers: headers });

     let post_to_api =  {
        
     }

    
 
     this.http.post(link, JSON.stringify(post_to_api), options)
       .subscribe(data => {
         console.log(data);
       
       let data_api=JSON.parse(data['_body']);

    
       this.result_html=data_api[0].re2;
       
      
for(let i=0; i<=11;i++){
  
  if(this.result_html[i]==null){

    //console.log('undifiend '+i)
  }
  else{
    console.log(i+' : '+this.result_html[i]);
  }
}

       }, error => {
         //console.log(error);
        
         this.alert_show('กรุณาเชื่อมต่ออินเตอร์เน็ต');
        
        
       });
 
   }













   ionViewDidLoad(){
    this.post_data()
   
   
    

   }







  
  }
