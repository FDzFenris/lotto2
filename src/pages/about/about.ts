import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { empty } from 'rxjs/Observer';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  public baseURL:string;
  public result_html:string;
  public result_html3:string;


  //public item_re2=<any>{};
  public item_re2:string[]=[];
  public item_re2_count:string[]=[];
 

  constructor(
    public navCtrl: NavController,
    public http:Http,
    public toastCtrl:ToastController ) {

      //this.baseURL='http://27.254.81.49:2894/soon/lottoly_20year.php';
      this.baseURL='http://localhost/newionic/lottoly_20year.php';

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
 
  post_data_2() {
    //////////เคียค่า array ให้เป็นค่าว่าง///////////////////
    this.item_re2=[];
    this.item_re2_count=[];
    //////////เคียค่า array ให้เป็นค่าว่าง///////////////////
    console.log("post2");
    var link = this.baseURL;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let post_to_api = {

    }



    this.http.post(link, JSON.stringify(post_to_api), options)
      .subscribe(data => {
        //console.log(data);

        let data_api = JSON.parse(data['_body']);


        this.result_html = data_api[0].re2;


        let i2 = 0;

        //////*30 นี้คือจำนวนรอบที่จะเช็คซ้ำๆได้มากสุด กำหนดเป็น 999 เลยก็ได้ อยู่ยัน 100ปี*//////
        for (let i = 0; i <= 30; i++) {

          if (this.result_html[i] == null) {

            //console.log('undifiend '+i)
          }
          else {
            this.item_re2[i2] = this.result_html[i]
            this.item_re2_count[i2] = i + ' ครั้ง ';
            console.log(i + ' : ' + this.item_re2[i2]);

            i2++;
          }


        }
        this.item_re2_count.reverse();

      }, error => {
        //console.log(error);

        this.alert_show('กรุณาเชื่อมต่ออินเตอร์เน็ต');


      });

  }




  post_data_3() {

    //////////เคียค่า array ให้เป็นค่าว่าง///////////////////
    this.item_re2=[];
    this.item_re2_count=[];
    //////////เคียค่า array ให้เป็นค่าว่าง///////////////////
    console.log("post3");
    var link = this.baseURL;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let post_to_api = {

    }



    this.http.post(link, JSON.stringify(post_to_api), options)
      .subscribe(data => {
        //console.log(data);

        let data_api = JSON.parse(data['_body']);


        this.result_html = data_api[0].re3;


        let i_3 = 0;

        for (let i3 = 0; i3 <= 30; i3++) {

          if (this.result_html[i3] == null) {

            //console.log('undifiend '+i)
          }
          else {
            this.item_re2[i_3] = this.result_html[i3]
            this.item_re2_count[i_3] = i3 + ' ครั้ง ';
            console.log(i3 + ' : ' + this.item_re2[i_3]);

            i_3++;
          }


        }
        this.item_re2_count.reverse();

      }, error => {
        //console.log(error);

        this.alert_show('กรุณาเชื่อมต่ออินเตอร์เน็ต');


      });

  }


  post_data_2_top() {

    //////////เคียค่า array ให้เป็นค่าว่าง///////////////////
    this.item_re2=[];
    this.item_re2_count=[];
    //////////เคียค่า array ให้เป็นค่าว่าง///////////////////
    console.log("post2_top");
    var link = this.baseURL;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let post_to_api = {

    }



    this.http.post(link, JSON.stringify(post_to_api), options)
      .subscribe(data => {
        //console.log(data);

        let data_api = JSON.parse(data['_body']);


        this.result_html = data_api[0].re1_2end;


        let i_3 = 0;

        for (let i3 = 0; i3 <= 30; i3++) {

          if (this.result_html[i3] == null) {

            //console.log('undifiend '+i)
          }
          else {
            this.item_re2[i_3] = this.result_html[i3]
            this.item_re2_count[i_3] = i3 + ' ครั้ง ';
            console.log(i3 + ' : ' + this.item_re2[i_3]);

            i_3++;
          }


        }
        this.item_re2_count.reverse();

      }, error => {
        //console.log(error);

        this.alert_show('กรุณาเชื่อมต่ออินเตอร์เน็ต');


      });

  }

  post_data_3_top() {

    //////////เคียค่า array ให้เป็นค่าว่าง///////////////////
    this.item_re2=[];
    this.item_re2_count=[];
    //////////เคียค่า array ให้เป็นค่าว่าง///////////////////
    console.log("post2_top");
    var link = this.baseURL;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let post_to_api = {

    }



    this.http.post(link, JSON.stringify(post_to_api), options)
      .subscribe(data => {
        //console.log(data);

        let data_api = JSON.parse(data['_body']);


        this.result_html = data_api[0].re1_3end;


        let i_3 = 0;

        for (let i3 = 0; i3 <= 30; i3++) {

          if (this.result_html[i3] == null) {

            //console.log('undifiend '+i)
          }
          else {
            this.item_re2[i_3] = this.result_html[i3]
            this.item_re2_count[i_3] = i3 + ' ครั้ง ';
            console.log(i3 + ' : ' + this.item_re2[i_3]);

            i_3++;
          }


        }
        this.item_re2_count.reverse();

      }, error => {
        //console.log(error);

        this.alert_show('กรุณาเชื่อมต่ออินเตอร์เน็ต');


      });

  }




  ionViewDidLoad() {
    this.post_data_2()




  }







  
  }
