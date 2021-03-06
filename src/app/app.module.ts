import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';




import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { OneSignal } from '@ionic-native/onesignal';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
   
    TabsPage
  ],
  imports: [
    
    BrowserModule,

    IonicModule.forRoot(MyApp,{tabsPlacement: 'top'}),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
   
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    LocalNotifications,
    OneSignal,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
   
  ]
})
export class AppModule {
 
}
