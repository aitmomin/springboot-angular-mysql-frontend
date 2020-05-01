import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';
import {EditImgComponent} from './edit-img/edit-img.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'add', component:AddComponent},
  {path:'edit', component:EditComponent},
  {path:'list', component:ListComponent},
  {path:'edit-img', component:EditImgComponent},
  {path:'home', component:HomeComponent},
  {path:'', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
