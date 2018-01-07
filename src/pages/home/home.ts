import { Component,ViewChild  } from '@angular/core';
import { NavController, NavParams,AlertController,Platform,Content   } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';



@Component({
  
  selector: 'page-home',
  templateUrl: 'home.html'
})
export  class HomePage   {

  @ViewChild(Content)
  content:Content;


   
  public formLogin : FormGroup;
  public baseURL:string;
  public result_html:string;
  public result_html1:string[]=[];
  public search_send:string;
  public bar_scan_=<any>{};

  public result_html_0:string=<any>{};
  public items0:string[]=[];
  public filtered:string;
 
  public todo = <any>{};

  public scroll_now:number;
  public serviceData:string;

  tabBarElement: any;

 
  constructor(
    public navCtrl: NavController,
    public toastCtrl:ToastController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public platform: Platform,
    public loadingCtrl: LoadingController,


    public androidPermissions: AndroidPermissions,
    private barcodeScanner: BarcodeScanner,
   
    public http:Http) 
    {
    
      
    //this.baseURL='http://fdzferrir.esy.es/soon/lottoly.php';
    //this.baseURL='http://localhost/newionic/lottoly.php';
    this.baseURL='http://27.254.81.49:2894/soon/lottoly.php';
    }
    
 
    
   /*  push() {
      this.navCtrl.push(ContactPage);
    } */
  
    LoadingDefault() {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      loading.present();
    
      setTimeout(() => {
        this.post_data();
        loading.dismiss();
      }, 500);
    }

    barcodescan() {
   
      this.barcodeScanner.scan().then((barcodeData) => {
                  
        //alert("type "+barcodeData.format+ " data "+barcodeData.text);
        this.bar_scan_ = barcodeData.text.split("-");
        this.check(this.bar_scan_[3]);
       
      }, (err) => {
        alert('ไม่สามารถเชื่อมต่อได้ _ '+err);
       
      });
    }
    
    ///// ตัวเช็คตำแหน่ง ปัจจุบัน ตาม scroll ที่อยู่ ////
  onScroll(event){
     
      var checktop:number={event}.event.scrollTop;
      this.scroll_now=checktop;
      //console.log({event}.event.scrollTop);
      let elem = <HTMLElement>document.querySelector(".tabbar");
   
      if(checktop<50){elem.style.display = 'flex'; }
      else if(checktop>51){elem.style.display = 'none';}       
      }
    

  go_top(){ this.content.scrollTo(0,5,this.scroll_now); } ///จะไปหยัง ตำแหน่งบนสุด scroll(5)  if โดยระยะเวลา = ตำแหน่ง scroll ปัจจุบัน


  alert_show(text_message) {
    let toast = this.toastCtrl.create({
      message: text_message,
      duration: 5000,
      position: "bottom",
      cssClass: "toast-success"
     
    });
    toast.present();
  }

  presentAlert(text_message,sub_message='') {
    let alert = this.alertCtrl.create({
      title: text_message,
      subTitle: sub_message,
      message: '55555555555555555555555',
      buttons: ['OK']
    });
    alert.present();
  }

  present_exit(text_message,sub_message) {
    let alert = this.alertCtrl.create({
      title: text_message,
      subTitle: sub_message,
      buttons: [ {
        text: 'OK AND CLOSE',
        role: 'OKKK',
        handler: () => {
          this.exit_app();
        }
      }]
    });
    alert.present();
    
  }





  post_data(search_send=""){

    
    
    console.log("post");
  
     var link = this.baseURL;
 
     var headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded' );
     let options = new RequestOptions({ headers: headers });

     let post_to_api =  {
         send1:search_send
     }

    
 
     this.http.post(link, JSON.stringify(post_to_api), options)
       .subscribe(data => {
         console.log(data);
       
       let data_api=JSON.parse(data['_body']);

    
       this.result_html=data_api[0].date;
  

       this.todo.showhead = data_api[0].lottoly_day;
      
   
       this.todo.showhead =  this.todo.showhead.split(" ");
       this.todo.showhead =  this.todo.showhead[1]+" "+this.todo.showhead[2]+" "+this.todo.showhead[3];
         
       }, error => {
         //console.log(error);
        
         this.alert_show('กรุณาเชื่อมต่ออินเตอร์เน็ต');
         this.present_exit('กรุณาเชื่อมต่ออินเตอร์เน็ต','ระบบจะทำการตรวจเช็คทุกครั้งที่เข้าใช้งาน');
        
       });
 
   }

  check(number_input=''){ 
   
   
    if(number_input==''){
      this.presentAlert("กรุณาใส่ตัวเลข 6 หลักเท่านั้น");
      return false;
    }
   if(number_input.length<6){
      this.presentAlert("กรุณาใส่ตัวเลข 6 หลักเท่านั้น");
    return false;
   }

 
    let check=0;
    for(let a=0;  a<this.result_html.length; a++){


      if(a==0){    ///เช็คเฉพาะเลขท้าย2ตัว   
        var is_a1= number_input;         
        this.filtered = this.result_html[a]["result"].filter(is_check1);
             
       }

      else if(a==1){    ///เช็คเฉพาะเลขท้าย2ตัว   
        var is_a2= number_input.substring(4);   
        this.filtered = this.result_html[a]["result"].filter(is_check2);
      }
      else  if(a==2 || a==3){    ///เช็คเฉพาะเลขท้าย3ตัว   
        var is_a3= number_input.substring(3);   
        this.filtered = this.result_html[a]["result"].filter(is_check3);
      }
      else{
        this.filtered = this.result_html[a]["result"].filter(isBigEnough);
      }

              if(this.filtered!=''){

                this.presentAlert('ยินดีด้วยคุณถูกรางวัล <br>'+this.result_html[a]['name_reward'],this.result_html[a]['reward']);
               //alert('ยินดีด้วยคุณถูกรางวัล '+this.result_html[a]['name_reward']+'  '+this.result_html[a]['reward']);              
              }
              else{

                let up = parseInt(this.result_html[0]["result"])+1;
                let down = parseInt(this.result_html[0]["result"])-1;

                      if(parseInt(number_input)==up||parseInt(number_input)==down){

                        this.presentAlert('ยินดีด้วยคุณถูกรางวัล <br> ข้างเคียงรางวัลที่ 1','รางวัลละ 100,000 บาท');
                        this.alert_show('ยินดีด้วยคุณถูกรางวัล ข้างเคียงรางวัลที่ 1 รางวัลละ 100,000 บาท');
                        break;

                      }
                            
                    check++;
                    if(check==8){                 
                      this.presentAlert('เสียใจด้วยคุณไม่ถูกรางวัลเลย');
                        return false;          
                    }

                  } 
          

      }

      function is_check1(value) {    
          return value == is_a1;
        }
      function is_check2(value) {       
        return value == is_a2;
       
      }
      function is_check3(value) {       
        return value == is_a3;
       
      }
      function isBigEnough(value) {
        return value == number_input;
       
      }


  }

  exit_app(){
    this.platform.exitApp();
  }

  ionViewDidLoad(){
    this.LoadingDefault()
   
    //this.post_data();
    

   }



}