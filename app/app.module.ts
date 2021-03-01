import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddFormComponent } from './add-form/add-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item-list/item/item.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { MatDialogModule } from '@angular/material/dialog';
import { EditItemComponent } from './edit-item/edit-item.component';
import { MainAppPageComponent } from './main-app-page/main-app-page.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { DemoComponent } from './demo/demo.component';

const firebaseConfig = {
  apiKey: 'AIzaSyDR-Lzvx8NhvBmsUOC1ehjfBvELcd68hbA',
  authDomain: 'budgetapp-54b74.firebaseapp.com',
  databaseURL: 'https://budgetapp-54b74.firebaseio.com',
  projectId: 'budgetapp-54b74',
  storageBucket: 'budgetapp-54b74.appspot.com',
  messagingSenderId: '504745788412',
  appId: '1:504745788412:web:235bd25a5ca58a1f85a879',
  measurementId: 'G-LXL6RT3B2V',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddFormComponent,
    ItemListComponent,
    ItemComponent,
    EditItemComponent,
    MainAppPageComponent,
    FrontPageComponent,
    DemoComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
