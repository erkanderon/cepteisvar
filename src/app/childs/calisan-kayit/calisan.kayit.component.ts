import { ElementRef, Component, } from '@angular/core';
import { Pub } from '../../services/pub.service';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import {NgForm} from '@angular/forms';
import {Employee} from '../../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
declare var jQuery : any;
declare var FileInput : any;
import { DatePipe } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'calisan-comp',
  templateUrl: './calisan.kayit.component.html',
  styleUrls: ['./calisan.kayit.component.css']
  
})
export class CalisanKayitComponent {
  

  cities: any;
  ct: any = 0;
  selectedDevice: any;
  jobs: any = 0;
  genders: any;
  fields: any;
  military: any;
  driver: any;
  jobcategory: any;
  education: any;
  epost: any;

    constructor(private elRef : ElementRef, private _pub: Pub, private _pservice: PostService, private router: Router) { 
		jQuery(document).ready(function () {

	  		
  		});
	}
	ngOnInit() {
	    this.cities = this._pub.getCities().then(cities => this.cities = cities);
	    this.genders = this._pub.getGenderTypes().then(genders => this.genders = genders);
	    this.military = this._pub.getMilitaryChoices().then(military => this.military = military);
	    this.driver = this._pub.getDriverLicenseTypes().then(driver => this.driver = driver);
	    this.jobcategory = this._pub.getJobCategories().then(jobcategory => this.jobcategory = jobcategory);
	    this.education = this._pub.getEducationTypes().then(education => this.education = education);
	}
	onChange(newValue) {
	    
	    this.ct = this._pub.getCityFieldList(newValue).then(ct => this.ct = ct);
	    this.selectedDevice = newValue;
	}
	onJobChange(newValue) {
		
		this.jobs = this._pub.getJobFieldList(newValue).then(jobs => this.jobs = jobs);

	}
	checker(value) {
		if(value){
			return 1;
		}else{
			return 0;
		}
	}
	responser(obj) {
		if(obj.code === 200){
			return true;
		}else{
			return false;
		}
	}
	onSubmit(f: NgForm) {
    	//console.log(f.value.yetkili);  // { first: '', last: '' }
    	//console.log(f.valid);  // false

    	this.epost = f.value.eposta;
   		let par = new DatePipe('en-US').transform(f.value.dtarihi, 'dd/MM/yyyy')
    	let pers = new Employee(f.value.isim,f.value.soyad ,parseInt(f.value.cinsiyet) ,f.value.adres ,parseInt(f.value.sd) ,f.value.eposta ,f.value.contact.toString() ,parseInt(f.value.ilce), parseInt(f.value.educate), par ,this.checker(f.value.secenek) ,this.checker(f.value.gizlilik) ,parseInt(f.value.meslek) ,parseInt(f.value.meslek2) ,f.value.tecrube ,this.checker(f.value.certificate), parseInt(f.value.ehliyet), parseInt(f.value.askerlik), f.value.parola);

    	console.log(pers);
    	if(f.valid && f.value.parola===f.value.parola2 && !!pers){
    		this._pservice.insertNewMemberAccount(JSON.stringify(pers)).then(
			    //used Arrow function here
			    (success)=> {
			      
			      if(this.responser(success)){
			      	//this.router.navigate(['/calisan-giris']);
			      }else{
			      	//this.router.navigate(['/home']);
			      	console.log(success);
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
    validate(f: NgForm) {

   		

    	
    	
		this._pservice.validateMemberAccount({ "p_email": this.epost, "p_sms_code": f.value.validatekod }).then(
		    //used Arrow function here
		    (success)=> {
		      
		      if(this.responser(success)){
		      	this.router.navigate(['/calisan-giris']);
		      }else{
		      	console.log(success);
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