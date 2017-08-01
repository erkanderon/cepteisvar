import { ElementRef, Component } from '@angular/core';
declare var jQuery : any;
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CanActivate } from '@angular/router';
import { PostService } from '../../services/post.service';

import { PreviewMemberModel } from '../../models/previewMemberAccount.model';
import { ChangeJobModel } from '../../models/changeJob.model';
import { Pub } from '../../services/pub.service';
import { EditMemberAccountModel } from '../../models/editMemberAccount.model';
import { ChangeAccountPasswordModel } from '../../models/changeAccountPassword.model';
import { UpdateUserLoginModel } from '../../models/updateUserLogInfo.model'
import { DatePipe } from '@angular/common';
import {NgForm} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'isarayanprofil-comp',
  templateUrl: './is.arayan.profil.component.html',
  styleUrls: ['./is.arayan.profil.component.css'],
  
})
export class IsArayanProfilComponent implements CanActivate{

  profile: any;
  member:  any;
  state: any = 0;
  cities: any;
  jobcategory: any=0;
  ct: any = 0;
  jobs: any=0;
  selectedDevice: any;
  genders: any;
  education: any;
  comments: any = {};
  sms: any = {};
  driver: any = {};
  military: any = {};
  isim: any=""; dtarihi: any=""; telefon: any=""; sd: any=""; askerlik: any=""; tecrube: any=""; gizlilik: any=""; soyad: any=""; cinsiyet: any=""; adres: any=""; educate: any=""; ilce: any=""; ehliyet: any=""; secenek: any=""; certificate: any=""; 

  param: any;
  sub: any;
  foo: any;
  fileImage: any = false;
  picture: any = false;


	constructor(
		private _authService: AuthService, private router: Router, private _pub: Pub, private elRef : ElementRef, private _post: PostService, private route: ActivatedRoute, private location: Location) { 

	  

    
    
    jQuery(document).ready(function () {

	  });

		this._authService.checkTokenIs().then((response) => {
        
    });

	}
  canActivate() {
      return this._authService.checkTokenIs()
        
  }
  ngOnInit() {
    
    this.router.events
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
          this.sub = this.route.params.subscribe(params => {
           this.param = params['foo']; // (+) converts string 'id' to a number
           this.activaTab("#"+this.param);
           
        });
        
      });
    
    this.member = new PreviewMemberModel(localStorage.getItem('user'));
    this.profile = this._post.previewMemberAccount(JSON.stringify(this.member)).then(res => this.profile = res);
    this.cities = this._pub.getCities().then(cities => this.cities = cities);
    this.jobcategory = this._pub.getJobCategories().then(jobcategory => this.jobcategory = jobcategory);
    this.education = this._pub.getEducationTypes().then(education => this.education = education);
    this.genders = this._pub.getGenderTypes().then(genders => this.genders = genders);
    this.military = this._pub.getMilitaryChoices().then(military => this.military = military);
    this.driver = this._pub.getDriverLicenseTypes().then(driver => this.driver = driver);

    this._post.previewMemberAccount(JSON.stringify(this.member)).then(res => this.getop(res));
    
  }
  ngAfterContentInit() {

  }
  getop(res){
    if(res){
      if(res.data){
        this.comments = this._post.getMemberComments({"p_userid": res.data[0].USER_ID}).then(comments => this.comments = comments);
        this.sms = this._post.getMemberSMS({"p_userid": res.data[0].USER_ID}).then(sms => this.sms = sms);
        this.onChange(res.data[0].CITY_ID);

        this.picture = this._pub.getProfilePicture(res.data[0].PHOTO_URL).then(picture => this.picture = picture);

        this.isim = res.data[0].NAME;
        this.dtarihi = res.data[0].REGISTERED_DATE;
        this.telefon = res.data[0].CONTACT_NO;
        this.sd = res.data[0].CITY_ID;
        this.askerlik = res.data[0].MILITARY_ID;
        this.tecrube = res.data[0].WORKING_EXPERIENCE;
        this.gizlilik = res.data[0].ALLOW_SMS;
        this.soyad = res.data[0].SURNAME;
        this.cinsiyet = res.data[0].GENDER_ID;
        this.adres = res.data[0].ADDRESS;
        this.educate = res.data[0].EDUCATION_ID;
        this.ilce = res.data[0].COUNTY_ID;
        this.ehliyet = res.data[0].LICENSE_ID;
        this.secenek = res.data[0].HOMEPAGE_ACTIVE;
        this.certificate = res.data[0].CERTIFICATE;
        
      }
    }
  }
  navigateParam(par){
    this.activaTab(par);
    this.router.navigate(['/is-arayan-profil', { foo: par }]);
  }
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  imageUploaded(event){
    this.fileImage = event.file;
    console.log(this.fileImage);
  }
  onChange(newValue) {
      
      this.ct = this._pub.getCityFieldList(newValue).then(ct => this.ct = ct);
      this.selectedDevice = newValue;
  }
  onJobChange(newValue) {
    
    this.jobs = this._pub.getJobFieldList(newValue).then(jobs => this.jobs = jobs);

  }
  public setNumber = (number) => {  
      this.state = number;
      window.scrollTo(0, 0);
  }

  responser(obj) {
    if(obj.code === 200){
      return true;
    }else{
      return false;
    }
  }
  checker(value) {
    if(value){
      return 1;
    }else{
      return 0;
    }
  }
  changePassword(fav: NgForm) {
    
    let userid = this.profile.data[0].USER_ID;
    let groupid = this.profile.data[0].GROUP_ID;
    let uri = '/calisan-giris';
    let pwd = new ChangeAccountPasswordModel(userid, groupid, fav.value.oldpass, fav.value.newpass);

    if(fav.valid && fav.value.newpass===fav.value.newpass2){

      this._post.changePassword(JSON.stringify(pwd)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              this.router.navigate([uri]);
            }else{
              //give a message
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            this.router.navigate(['/home']);
         }
      )
    }
    
  }
  editMemberForm(f: NgForm) {
      let userid = this.profile.data[0].USER_ID;
      let dt = new DatePipe('en-US').transform(f.value.dtarihi, 'dd/MM/yyyy');
      let member = new EditMemberAccountModel(userid, f.value.isim, f.value.soyad, parseInt(f.value.cinsiyet), f.value.adres, parseInt(f.value.sd), f.value.telefon.toString(), parseInt(f.value.ilce), parseInt(f.value.educate), dt, this.checker(this.secenek), this.checker(f.value.gizlilik), f.value.tecrube, this.checker(this.certificate), parseInt(f.value.ehliyet), parseInt(f.value.askerlik) );

      console.log(member);
      if(f.valid && !!member){
        this._post.editMemberAccount(JSON.stringify(member)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              //refresh page
              if(this.fileImage){
                this._post.uploadPhoto(userid, 4000, this.fileImage).then(
                    //used Arrow function here
                    (success)=> {
                      
                      if(this.responser(success)){
                        location.reload();
                      }else{
                        //give a message
                        console.log(success)
                      }
                      
                    }
                ).catch(
                   //used Arrow function here
                   (err)=> {
                      //this.router.navigate(['/home']);
                   }
                )
              }
              //location.reload();
            }else{
              //give error
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            //this.router.navigate(['/home']);
         }
      )
    }
      
  }

  changeJob1(f: NgForm) {

    let userid = this.profile.data[0].USER_ID;
    let secjob = this.profile.data[0].SECONDARY_JOB_ID;
    let secjobdesc = this.profile.data[0].SECONDARY_JOB_DESCRIPTION;
    let job = new ChangeJobModel(userid, f.value.meslek,secjob,f.value.desc1,secjobdesc)

    console.log(job);

    this._post.changeJob(JSON.stringify(job)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              location.reload();
            }else{
              //give a message
              console.log(success)
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            this.router.navigate(['/home']);
         }
      )
  }
  changeJob2(f: NgForm) {

    let userid = this.profile.data[0].USER_ID;
    let prmjob = this.profile.data[0].PRIMARY_JOB_ID;
    let prmjobdesc = this.profile.data[0].PRIMARY_JOB_DESCRIPTION;
    let job = new ChangeJobModel(userid, prmjob,f.value.meslek2,prmjobdesc,f.value.desc2)

    console.log(job);

    this._post.changeJob(JSON.stringify(job)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              location.reload();
            }else{
              //give a message
              console.log(success)
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            this.router.navigate(['/home']);
         }
      )
  }

  activaTab(tab){
    jQuery(tab).tab('show');
  };


  
  
}