import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { MetpagoComponent } from './pages/admin/metpago/metpago.component';
import { MetpagoCreateComponent } from './pages/admin/metpago/metpago-create/metpago-create.component';
import { MetpagoUpdateComponent } from './pages/admin/metpago/metpago-update/metpago-update.component';
import { MetenvioComponent } from './pages/admin/metenvio/metenvio.component';
import { MetenvioCreateComponent } from './pages/admin/metenvio/metenvio-create/metenvio-create/metenvio-create.component';
import { MetenvioUpdateComponent } from './pages/admin/metenvio/metenvio-update/metenvio-update/metenvio-update.component';
import { MessageListComponent } from '../app/pages/admin/message-list/message-list.component';
import { LoadProductComponent } from '../app/pages/admin/load-product/load-product.component';
import { ProductListComponent } from '../app/pages/admin/product-list/product-list.component';

import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ListCategoryComponent } from './pages/admin/category/list-category/list-category.component';
import { CreateCategoryComponent } from './pages/admin/category/create-category/create-category.component';
import { UpdateCategoryComponent } from './pages/admin/category/update-category/update-category.component';
import { ProductFormComponent } from './components/product-form/product-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },

  { path: 'metodospago',  canActivate: [AuthenticationGuard], component: MetpagoComponent },
  { path: 'metodopago/create', canActivate: [AuthenticationGuard],component: MetpagoCreateComponent},
  { path: 'metodopago/:id/update',canActivate: [AuthenticationGuard], component: MetpagoUpdateComponent},
  { path: 'metodosenvio', canActivate: [AuthenticationGuard],component: MetenvioComponent },
  { path: 'metodoenvio/create',canActivate: [AuthenticationGuard], component: MetenvioCreateComponent},
  { path: 'metodoenvio/:id/update',canActivate: [AuthenticationGuard], component: MetenvioUpdateComponent},
  { path: 'categoria', canActivate: [AuthenticationGuard],component: ListCategoryComponent },
  { path: 'categoria/create',canActivate: [AuthenticationGuard], component: CreateCategoryComponent},
  { path: 'categoria/:categoryId/update',canActivate: [AuthenticationGuard], component: UpdateCategoryComponent},
  { path: 'admin/message-list',canActivate: [AuthenticationGuard], component: MessageListComponent},
  { path: 'admin/load-product',canActivate: [AuthenticationGuard], component: ProductFormComponent},
  { path: 'admin/product-list',canActivate: [AuthenticationGuard], component: ProductListComponent},
  { path: 'product/:productId/update',canActivate: [AuthenticationGuard], component: ProductFormComponent},
 

  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
  // EJEMPLO DE UNA RUTA PROTEGIDA
  //{ path: 'tasks', canActivate: [AuthenticationGuard], component: TasksPageComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }