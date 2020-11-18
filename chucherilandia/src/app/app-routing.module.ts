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

import { CategoriaComponent } from './pages/admin/categoria/categoria.component';
import { CategoriaCreateComponent } from './pages/admin/categoria/categoria-create/categoria-create.component';
import { CategoriaUpdateComponent } from './pages/admin/categoria/categoria-update/categoria-update.component';

import { MessageListComponent } from '../app/pages/admin/message-list/message-list.component';

import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';

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
  { path: 'categorias', canActivate: [AuthenticationGuard],component: CategoriaComponent },
  { path: 'categoria/create',canActivate: [AuthenticationGuard], component: CategoriaCreateComponent},
  { path: 'categoria/:id/update',canActivate: [AuthenticationGuard], component: CategoriaUpdateComponent},
  { path: 'admin/message-list',canActivate: [AuthenticationGuard], component: MessageListComponent},

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