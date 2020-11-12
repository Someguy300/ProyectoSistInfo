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


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'metodospago', component: MetpagoComponent },
  { path: 'metodopago/create', component: MetpagoCreateComponent},
  { path: 'metodopago/:id/update', component: MetpagoUpdateComponent},
  { path: 'metodosenvio', component: MetenvioComponent },
  { path: 'metodoenvio/create', component: MetenvioCreateComponent},
  { path: 'metodoenvio/:id/update', component: MetenvioUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }