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
import { AdminGuard } from './guards/admin.guard';
import { ListCategoryComponent } from './pages/admin/category/list-category/list-category.component';
import { CreateCategoryComponent } from './pages/admin/category/create-category/create-category.component';
import { UpdateCategoryComponent } from './pages/admin/category/update-category/update-category.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { StoreComponent } from './pages/store/store.component';
import { CreateBagComponent } from './pages/bag/create-bag/create-bag.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },

  { path: 'metodospago',  canActivate: [AdminGuard], component: MetpagoComponent },
  { path: 'metodopago/create', canActivate: [AdminGuard],component: MetpagoCreateComponent},
  { path: 'metodopago/:id/update',canActivate: [AdminGuard], component: MetpagoUpdateComponent},
  { path: 'metodosenvio', canActivate: [AdminGuard],component: MetenvioComponent },
  { path: 'metodoenvio/create',canActivate: [AdminGuard], component: MetenvioCreateComponent},
  { path: 'metodoenvio/:id/update',canActivate: [AdminGuard], component: MetenvioUpdateComponent},
  { path: 'categoria', canActivate: [AdminGuard],component: ListCategoryComponent },
  { path: 'categoria/create',canActivate: [AdminGuard], component: CreateCategoryComponent},
  { path: 'categoria/:categoryId/update',canActivate: [AdminGuard], component: UpdateCategoryComponent},
  { path: 'admin/message-list',canActivate: [AdminGuard], component: MessageListComponent},
  { path: 'admin/load-product',canActivate: [AdminGuard], component: LoadProductComponent},
  { path: 'admin/product-list',canActivate: [AdminGuard], component: ProductListComponent},
  { path: 'product/:productId/update',canActivate: [AdminGuard], component: ProductFormComponent},
  { path: 'store',canActivate: [AuthenticationGuard], component: StoreComponent},
  { path: 'bag/:productId/add', component: CreateBagComponent},
 

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