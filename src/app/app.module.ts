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
import { PostService } from './services/post.service'
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

import { AboutUsComponent } from './childs/hakkimizda/hakkimizda.component';
import { ContactUsComponent } from './childs/iletisim/iletisim.component';
import { ResetPasswordComponent } from './childs/reset-password/reset.password.component';

import { AgmCoreModule } from '@agm/core';


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
    ResetPasswordComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    OwlModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfjFE_rSuwj5D8Q13rVC48aSaWzOUZXDk'
    })
  ],
  providers: [
        Pub, PostService
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
