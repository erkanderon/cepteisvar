import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './childs/header/header.component';
import { HomeComponent } from './childs/homepage/homepage.component';
import { FooterComponent } from './childs/footer/footer.component';

import { Pub } from './services/pub.service';
import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';
import { IsverenGirisComponent } from './childs/isveren-giris/isveren.giris.component';
import { CalisanGirisComponent } from './childs/calisan-giris/calisan.giris.component';
import { CalisanKayitComponent } from './childs/calisan-kayit/calisan.kayit.component';
import { IsverenKayitComponent } from './childs/isveren-kayit/isveren.kayit.component';
import { AramaComponent } from './childs/arama-sonuclari/arama.component';
import { IsArayanProfilComponent } from './childs/is-arayan-profil/is.arayan.profil.component';
import { IsVerenProfilComponent } from './childs/is-veren-profil/is.veren.profil.component';
import { MeslekHaritasiComponent } from './childs/meslek-haritasi/meslek.haritasi.component';
import { DuyurularComponent } from './childs/duyurular/duyurular.component';
import { DuyurularRightSideComponent } from './childs/duyurular-rightside/duyurular.rightside';
import { DuyuruComponent } from './childs/duyuru/duyuru.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';


import { AboutUsComponent } from './childs/hakkimizda/hakkimizda.component';
import { ContactUsComponent } from './childs/iletisim/iletisim.component';
import { ResetPasswordComponent } from './childs/reset-password/reset.password.component';
import { SMSGonderComponent } from './childs/sms-gonder/sms.gonder';
import { CalisanProfilComponent } from './childs/calisan-profil/calisan.profil.component';
import { ResetPasswordNew } from './childs/reset-password-new/reset.password';
import { PaymentResult } from './childs/payment-result/payment.result';




import { AgmCoreModule } from '@agm/core';
import { ImageUploadModule } from 'angular2-image-upload';
import { FlashMessagesModule } from 'angular2-flash-messages';


// Import your library
import { OwlModule } from 'angular-owl-carousel';


const appRoutes : Routes = [
  /*{ path: '', component: DashboardComponent, data: { title: 'dashboard'} },*/
  { path: 'home', component: HomeComponent, data: { title: 'home'} },
  { path: 'isveren-giris', component: IsverenGirisComponent, data: { title: 'isverengiris'} },
  { path: 'calisan-giris', component: CalisanGirisComponent, data: { title: 'calisangiris'} },
  { path: 'calisan-kayit', component: CalisanKayitComponent, data: { title: 'calisankayit'} },
  { path: 'isveren-kayit', component: IsverenKayitComponent, data: { title: 'isverenkayit'} },
  { path: 'calisan-arama', component: AramaComponent, data: { title: 'AramaComponent'} },
  { path: 'is-arayan-profil', component: IsArayanProfilComponent, data: { title: 'IsArayanProfilComponent'} },
  { path: 'is-veren-profil', component: IsVerenProfilComponent, data: { title: 'IsVerenProfilComponent'} },
  { path: 'meslek-haritasi', component: MeslekHaritasiComponent, data: { title: 'IsVerenProfilComponent'} },
  { path: 'duyurular', component: DuyurularComponent, data: { title: 'DuyurularComponent'} },
  { path: 'duyuru/:id', component: DuyuruComponent, data: { title: 'DuyuruComponent'} },
  { path: 'hakkimizda', component: AboutUsComponent, data: { title: 'AboutUsComponent'} },
  { path: 'iletisim', component: ContactUsComponent, data: { title: 'ContactUsComponent'} },
  { path: 'reset', component: ResetPasswordComponent, data: { title: 'ResetPasswordComponent'} },
  { path: 'reset_password', component: ResetPasswordNew, data: { title: 'ResetPasswordNew'} },
  { path: 'sms-gonder', component: SMSGonderComponent, data: { title: 'SMSGonderComponent'} },
  { path: 'webapi/payment/result', component: PaymentResult, data: { title: 'PaymentResult'} },
  { path: 'calisan-profil/:id', component: CalisanProfilComponent, data: { title: 'CalisanProfilComponent'} },
  /*{ path: '', redirectTo: 'login', pathMatch: 'full'},*/
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    IsverenGirisComponent,
    CalisanGirisComponent,
    CalisanKayitComponent,
    IsverenKayitComponent,
    AramaComponent,
    IsArayanProfilComponent,
    IsVerenProfilComponent,
    MeslekHaritasiComponent,
    DuyurularComponent,
    DuyurularRightSideComponent,
    DuyuruComponent,
    AboutUsComponent,
    ContactUsComponent,
    ResetPasswordComponent,
    SMSGonderComponent,
    CalisanProfilComponent,
    ResetPasswordNew,
    PaymentResult


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    OwlModule,
    NgxPaginationModule,
    AngularMultiSelectModule,

    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfjFE_rSuwj5D8Q13rVC48aSaWzOUZXDk'
    }),
    ImageUploadModule.forRoot()
  ],
  providers: [
         AuthService, Pub, PostService
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
