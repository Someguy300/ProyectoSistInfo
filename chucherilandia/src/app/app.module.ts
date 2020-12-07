import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { EfectoComponent } from './components/efecto/efecto.component';

import { MetpagoComponent } from './pages/admin/metpago/metpago.component';
import { MetpagoCreateComponent } from './pages/admin/metpago/metpago-create/metpago-create.component';
import { MetpagoUpdateComponent } from './pages/admin/metpago/metpago-update/metpago-update.component';
import { MetpagoFormComponent } from './components/metpago-form/metpago-form.component';
import { MetenvioComponent } from './pages/admin/metenvio/metenvio.component';
import { MetenvioCreateComponent } from './pages/admin/metenvio/metenvio-create/metenvio-create/metenvio-create.component';
import { MetenvioFormComponent } from './components/metenvio-form/metenvio-form/metenvio-form.component';
import { MetenvioUpdateComponent } from './pages/admin/metenvio/metenvio-update/metenvio-update/metenvio-update.component';
import { MessageListComponent } from './pages/admin/message-list/message-list.component';

// Firebase Imports
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { firebaseConfig } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
// Firebase Configuration
import { environment } from 'src/environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoadProductComponent } from './pages/admin/load-product/load-product.component';
import { ProductListComponent } from './pages/admin/product-list/product-list.component';
import { CreateCategoryComponent } from './pages/admin/category/create-category/create-category.component';
import { UpdateCategoryComponent } from './pages/admin/category/update-category/update-category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ListCategoryComponent } from './pages/admin/category/list-category/list-category.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { StoreComponent } from './pages/store/store.component';
import { CreateBagComponent } from './pages/bag/create-bag/create-bag.component';
//import { CartComponent } from './pages/cart/cart.component';

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
    LoginComponent,
    SignUpComponent,
    MessageListComponent,
    LoadProductComponent,
    ProductListComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    CategoryFormComponent,
    ListCategoryComponent,
    ProductFormComponent,
    StoreComponent,
    CreateBagComponent,
    //CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
