import { ElementRef, Component } from '@angular/core';
declare var jQuery : any;
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  styleUrls: ['./is.arayan.profil.component.css']
})
export class IsArayanProfilComponent {

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

  p: number = 1;
  c: number = 1;

  param: any;
  sub: any;
  foo: any;
  fileImage: any = false;
  userImageFirst: any = false;
  pphoto: any;
  notequal: any =false;

  operation: any = {};
  operationfault: any = {};

  photoOperation: any = false;
  photoOperationfault: any = false;


	constructor(
		private _authService: AuthService, private router: Router, private _pub: Pub, private elRef : ElementRef, private _post: PostService, private route: ActivatedRoute, private location: Location) { 

	  
    if(!this._authService.isLoggedIn){
      this._authService.logout();
    }

    jQuery(document).ready(function () {

	  });

		
    

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
  getop(res){
    if(res){
      if(res.data){
        this.comments = this._post.getMemberComments({"p_userid": res.data[0].USER_ID}).then(comments => this.comments = comments);
        this.sms = this._post.getMemberSMS({"p_userid": res.data[0].USER_ID}).then(sms => this.sms = sms);
        this.onChange(res.data[0].CITY_ID);

        this.isim = res.data[0].NAME;
        this.dtarihi = res.data[0].REGISTERED_DATE.split("-").reverse().join("-");
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
        this.secenek = !res.data[0].HOMEPAGE_ACTIVE;
        this.certificate = !res.data[0].CERTIFICATE;


        this._post.getMemberPhotoStatus({ "p_userid": res.data[0].USER_ID }).then(res => this.checkPhoto(res));

        this.pphoto = this._post.getProfilePhoto(4000, res.data[0].USER_ID);
        
      }
    }
  }
  checkPhoto(res){
    if(res.data==='1'){
      //gec
      console.log('gec');
      this.openModel();
    }else{
      //photo modal cikar
      console.log('photo modal cikar')
    }
  }
  openModel(){
    jQuery("#photommodal").modal({"backdrop": "static"});
    //this.fileInput.nativeElement.click()
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
  }
  imageRemoved(event){
    this.fileImage = false;
  }
  imageRemovedFirstTime(event){
    this.userImageFirst = false;
  }
  imageUploadedFirstTime(event){
    this.userImageFirst = event.file;
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
      return 0;
    }else{
      return 1;
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
              this.operation.status = success.status;
              this.operation.text = success.userMessage;

              setTimeout(()=>{ 
               location.reload();
              }, 3000);
              
            }else{
              this.operationfault.status = success.status;
              this.operationfault.text = success.userMessage;
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            this.router.navigate(['/home']);
         }
      )
    }else{
      this.notequal = true;
    }
    
  }
  editMemberForm(f: NgForm) {
      let userid = this.profile.data[0].USER_ID;
      let dt = new DatePipe('en-US').transform(f.value.dtarihi, 'dd/MM/yyyy');
      let member = new EditMemberAccountModel(userid, f.value.isim, f.value.soyad, parseInt(f.value.cinsiyet), f.value.adres, parseInt(f.value.sd), f.value.telefon.toString(), parseInt(f.value.ilce), parseInt(f.value.educate), dt, this.checker(this.secenek), !this.checker(f.value.gizlilik), f.value.tecrube, this.checker(this.certificate) , parseInt(f.value.ehliyet), parseInt(f.value.askerlik) );


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
                        this.operation.status = success.status;
                        this.operation.text = success.userMessage;
                        setTimeout(()=>{ 
                         location.reload();
                        }, 3000);
                      }else{
                        this.operationfault.status = success.status;
                        this.operationfault.text = success.userMessage;
                      }
                      
                    }
                ).catch(
                   //used Arrow function here
                   (err)=> {
                      //this.router.navigate(['/home']);
                   }
                )
              }
              this.operation.status = success.status;
              this.operation.text = success.userMessage;
              setTimeout(()=>{ 
               location.reload();
              }, 3000);
              
            }else{
              this.operationfault.status = success.status;
              this.operationfault.text = success.userMessage;
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

  loadPhoto(){

    let userid = this.profile.data[0].USER_ID;

    if(this.userImageFirst){
      this._post.uploadPhoto(userid, 4000, this.userImageFirst)
      .then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              
              this.photoOperation = success.userMessage;
              setTimeout(()=>{ 
                jQuery("#photommodal").modal('hide');
              }, 2000);
              setTimeout(()=>{ 
                location.reload();
              }, 4000);
              
            }else{
              this.photoOperationfault = success.userMessage;
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            //this.router.navigate(['/home']);
         }
      )
    }else{
      this.photoOperationfault = "Fotoğrafınızı Yüklemeniz Gerekmektedir.";
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
              this.operation.status = success.status;
              this.operation.text = success.userMessage;
              setTimeout(()=>{ 
               location.reload();
              }, 3000);
            }else{
              this.operationfault.status = success.status;
              this.operationfault.text = success.userMessage;
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            this.router.navigate(['/home']);
         }
      )
  }
  removeJob1() {

    let userid = this.profile.data[0].USER_ID;
    let secjob = this.profile.data[0].SECONDARY_JOB_ID;
    let secjobdesc = this.profile.data[0].SECONDARY_JOB_DESCRIPTION;
    let job = new ChangeJobModel(userid, 0,secjob,0,secjobdesc)

    console.log(job);

    this._post.changeJob(JSON.stringify(job)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              this.operation.status = success.status;
              this.operation.text = success.userMessage;
              setTimeout(()=>{ 
               location.reload();
              }, 3000);
            }else{
              this.operationfault.status = success.status;
              this.operationfault.text = success.userMessage;
            }
            
          }
      ).catch(
         //used Arrow function here
         (err)=> {
            this.router.navigate(['/home']);
         }
      )
  }
  removeJob2() {

    let userid = this.profile.data[0].USER_ID;
    let prmjob = this.profile.data[0].PRIMARY_JOB_ID;
    let prmjobdesc = this.profile.data[0].PRIMARY_JOB_DESCRIPTION;
    let job = new ChangeJobModel(userid, prmjob,0,prmjobdesc,0)

    console.log(job);

    this._post.changeJob(JSON.stringify(job)).then(
          //used Arrow function here
          (success)=> {
            
            if(this.responser(success)){
              this.operation.status = success.status;
              this.operation.text = success.userMessage;
              setTimeout(()=>{ 
               location.reload();
              }, 3000);
            }else{
              this.operationfault.status = success.status;
              this.operationfault.text = success.userMessage;
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
              this.operation.status = success.status;
              this.operation.text = success.userMessage;
              setTimeout(()=>{ 
               location.reload();
              }, 3000);
            }else{
              this.operationfault.status = success.status;
              this.operationfault.text = success.userMessage;
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