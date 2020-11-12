import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { EfectoComponent } from './components/efecto/efecto.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { firebaseConfig } from '../environments/environment';
import { MetpagoComponent } from './pages/admin/metpago/metpago.component';
import { MetpagoCreateComponent } from './pages/admin/metpago/metpago-create/metpago-create.component';
import { MetpagoUpdateComponent } from './pages/admin/metpago/metpago-update/metpago-update.component';
import { MetpagoFormComponent } from './components/metpago-form/metpago-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetenvioComponent } from './pages/admin/metenvio/metenvio.component';
import { MetenvioCreateComponent } from './pages/admin/metenvio/metenvio-create/metenvio-create/metenvio-create.component';
import { MetenvioFormComponent } from './components/metenvio-form/metenvio-form/metenvio-form.component';
import { MetenvioUpdateComponent } from './pages/admin/metenvio/metenvio-update/metenvio-update/metenvio-update.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    EfectoComponent,
    MetpagoComponent,
    MetpagoCreateComponent,
    MetpagoUpdateComponent,
    MetpagoFormComponent,
    MetenvioComponent,
    MetenvioCreateComponent,
    MetenvioFormComponent,
    MetenvioUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
