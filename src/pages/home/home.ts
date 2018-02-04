import { Component,ViewChild  } from '@angular/core';
import { NavController, NavParams,AlertController,Platform,Content   } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//import { ContactPage } from '../../pages/contact/contact';

import { OneSignal } from '@ionic-native/onesignal';

@Component({
  
  selector: 'page-home',
  templateUrl: 'home.html'
})
export  class HomePage   {

  @ViewChild(Content)
  content:Content;

  public form_Lottoly : FormGroup;
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

  public onesignal_URL:string;
  public onesignal_URL2:string;
  public onesignal_URL3:string;

  public user_id:string;

  tabBarElement: any;

  constructor(
    public navCtrl: NavController,
    public toastCtrl:ToastController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public formbuilder: FormBuilder,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public oneSignal: OneSignal,
    public androidPermissions: AndroidPermissions,
    private barcodeScanner: BarcodeScanner,
   
    public http:Http) 
    {

    this.baseURL='http://fdzferrir.esy.es/soon/lottoly.php';
   
    //this.baseURL='http://27.254.81.49:2894/soon/lottoly.php';
    //this.onesignal_URL='http://fdzferrir.esy.es/soon/onesignal.php';
    this.onesignal_URL='https://fdzfenris.000webhostapp.com/api/onesignal.php';
    this.onesignal_URL2='http://fdzferrir.esy.es/soon/onesignal2.php';
    this.onesignal_URL3='http://fdzferrir.esy.es/soon/onesignal3.php';
    
    this.Validat_number();   

    this.post_onesignal_allnotifications();
   
   
    this.initializeApp();

    }
    
    initializeApp() {
      this.platform.ready().then(() =>{
       
        this.oneSignal.startInit('9b5c10b8-6128-407f-950a-49b646a25436', '54571618875');     
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);       
        this.oneSignal.endInit();
      
       });
    }

  
    post_onesignal_allnotifications() {
      this.oneSignal.getIds().then(ids => {
        //alert(ids.userId);
        ids.userId;
     
              var link = this.onesignal_URL2;
              var headers = new Headers();
              headers.append('Content-Type', 'application/x-www-form-urlencoded');
              let options = new RequestOptions({ headers: headers });
              //alert('in_post : '+this.user_id);
              let post_to_api = {

              };
          
          
          
              this.http.post(link, JSON.stringify(post_to_api), options)
                .subscribe(data => {
                  console.log(data);
              
              let data_api2 = JSON.parse(data['_body']);
          
              
              for(let i=0;  i<data_api2.notifications.length; i++){

                //console.log('USER MOBILE ID : '+ ids.userId);
               // console.log("include_player_ids: " +data_api2.notifications[i].include_player_ids);
                if(ids.userId==data_api2.notifications[i].include_player_ids){
                  //alert("MOBILE : "+ids.userId +" = "+data_api2.notifications[i].include_player_ids+" cancal id : "+data_api2.notifications[i].id);
                  //console.log("id: " +data_api2.notifications[i].id);
                  this.cancal_notifications(data_api2.notifications[i].id);
                 
                }
                else{

                }
               
              
              }
                  
          

          
                
          
                }, error => {
                  //console.log(error);
          
                  this.alert_show('ระบบการแจ้งเตือน กำลังปรับปรุง');
          
          
                });

      }, error => {
        //console.log(error);

        this.alert_show('ID USER ไม่พบ');


      });


      
    } 

    cancal_notifications(nofi_id) {
     
      var link = this.onesignal_URL3;
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });
      //alert('in_post : '+this.user_id);
      let post_to_api = {
        nofi_ID:nofi_id
           
      };
  
  
  
      this.http.post(link, JSON.stringify(post_to_api), options)
        .subscribe(data => {
          //console.log(data);
      
       let data_cancal = JSON.parse(data['_body']);
       console.log(data_cancal);
      
         
  
        }, error => {
          //console.log(error);
  
          this.alert_show('CANCALการแจ้งเตือนกำลังปรับปรุง');
  
  
        });



      
    } 
   

    post_onesignal(input1,input2,input3,input4,input5) {
      //////////แจ้งเตือน ส่วนต่างๆ///////////////////
      this.oneSignal.getIds().then(ids => {
        //alert(ids.userId);
        this.user_id=ids.userId;
     
      //console.log("post_onesignal");
      var link = this.onesignal_URL;
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });
      //alert('in_post : '+this.user_id);
      let post_to_api = {
        user_ID:this.user_id,  
           send1:input1,
           send2:input2,
           send3:input3,
           send4:input4,
           send5:input5,
      };
  
  
  
      this.http.post(link, JSON.stringify(post_to_api), options)
        .subscribe(data => {
          console.log(data);
      
       let data_api2 = JSON.parse(data['_body']);
  
        alert(data_api2);
  
          //console.log(data_api2);
  
  
         
  
        }, error => {
          //console.log(error);
  
          this.alert_show('ระบบการแจ้งเตือน กำลังปรับปรุง');
  
  
        });



      }, error => {
        //console.log(error);
        this.alert_show('กรุณาเข้าในมือถือ'+error);
      }); 
    } 
    

   
    
    Validat_number(){
      this.form_Lottoly = this.formbuilder.group({
        "todo.search"  : ["", Validators.compose([
          Validators.required,Validators.pattern('^[0-9]*$')])]
     });
    }

    Validat_string(){
      this.form_Lottoly = this.formbuilder.group({
        "todo.search": ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z]*')])]
       
    });
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

      if(checktop<50){elem.style.zIndex  = '9'; }
      else if(checktop>51){elem.style.zIndex = '0';}       
      }
   
     /*  if(checktop<50){elem.style.top = '0'; }
      else if(checktop>51){elem.style.top = '-44px';}       
      } */

    /*   if(checktop<50){elem.style.display = 'flex'; }
      else if(checktop>51){elem.style.display = 'none';}       
      } */
    

  go_top(){ this.content.scrollTo(0,1,this.scroll_now); } ///จะไปหยัง ตำแหน่งบนสุด scroll(5)  if โดยระยะเวลา = ตำแหน่ง scroll ปัจจุบัน


  alert_show(text_message) {
    let toast = this.toastCtrl.create({
      message: text_message,
      duration: 5000,
      position: "bottom",
      cssClass: "toast-success"
     
    });
    toast.present();
  }


/* testalert(){

  let alert = this.alertCtrl.create({
    title: 'Hello',
    buttons: [{
      text: 'Ok',
     
      handler: () => {     
     // this.navCtrl.push(ContactPage);
     }
    }],
    cssClass: 'alertcss',
  });
  
  alert.present();
} */


  presentAlert(text_message,sub_message='') {
    let alert = this.alertCtrl.create({
      title: text_message,
      subTitle: sub_message,
      message: '',
      buttons: ['OK'],
      cssClass: 'alertcss'
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
       
      
       console.log(this.result_html[0]['result'][0]+" "+this.result_html[1]['result'][0]);
      




   
       //this.todo.showhead =  this.todo.showhead.split(" ");
       //this.todo.showhead =  this.todo.showhead[1]+" "+this.todo.showhead[2]+" "+this.todo.showhead[3];



       let send2= this.result_html[0]['result'][0];
       let send3= this.result_html[1]['result'][0];
       let send4= this.result_html[2]['result'][0];
       let send5= this.result_html[3]['result'][0];

       this.post_onesignal(this.todo.showhead,send2,send3,send4,send5);
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

                this.presentAlert('<h3>ยินดีด้วยคุณถูกรางวัล </h3>'+'<h4  class="data_alert"  >'+this.result_html[a]['name_reward']+'</h4>',this.result_html[a]['reward']);
               //alert('ยินดีด้วยคุณถูกรางวัล '+this.result_html[a]['name_reward']+'  '+this.result_html[a]['reward']);              
              }
              else{

                let up = parseInt(this.result_html[0]["result"])+1;
                let down = parseInt(this.result_html[0]["result"])-1;

                      if(parseInt(number_input)==up||parseInt(number_input)==down){

                        this.presentAlert('<h3>ยินดีด้วยคุณถูกรางวัล </h3> <h4  class="data_alert"  >ข้างเคียงรางวัลที่ 1</h4>','รางวัลละ 100,000 บาท');
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