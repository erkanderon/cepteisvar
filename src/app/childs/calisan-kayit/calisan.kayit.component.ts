import { ElementRef, Component, } from '@angular/core';
import { Pub } from '../../services/pub.service';
import { PostService } from '../../services/post.service';
import {NgForm} from '@angular/forms';
import {Employee} from '../../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
declare var jQuery : any;
declare var FileInput : any;

@Component({
  moduleId: module.id,
  selector: 'calisan-comp',
  templateUrl: './calisan.kayit.component.html',
  styleUrls: ['./calisan.kayit.component.css'],
  providers: [Pub,PostService]
})
export class CalisanKayitComponent {
  

  cities: any;
  ct: any = 0;
  selectedDevice: any;
  jobs: any;
  genders: any;
  fields: any;

    constructor(private elRef : ElementRef, private _pub: Pub, private _pservice: PostService, private router: Router) { 
		jQuery(document).ready(function () {

	  		jQuery("#input-1").fileinput({
			    defaultPreviewContent: '<img src="./assets/images/Employee1.png" alt="Your Avatar" style="width:160px">',
			    browseLabel: '',
			    browseIcon: "Dosya Sec"
			});
  		});
	}
	ngOnInit() {
	    this.cities = this._pub.getCities().then(cities => this.cities = cities);
	    this.jobs = this._pub.getJobTypeList().then(jobs => this.jobs = jobs);
	    this.genders = this._pub.getGenderTypes().then(genders => this.genders = genders);
	    
	    
	}
	onChange(newValue) {
	    
	    this.ct = this._pub.getCityFieldList(newValue).then(ct => this.ct = ct);
	    console.log(this.ct.data);
	    this.selectedDevice = newValue;
	}
	onSubmit(f: NgForm) {
    	//console.log(f.value.yetkili);  // { first: '', last: '' }
    	//console.log(f.valid);  // false
    	let comp = new Employee(f.value.isim, f.value.soyad, f.value.cinsiyet, f.value.adres, f.value.egitim, f.value.cityname, f.value.eposta, f.value.dtarihi, f.value.contactno, f.value.cname, f.value.secenek, f.value.gizlilik, f.value.meslek, f.value.meslek2, f.value.tecrube, f.value.certificate, f.value.parola);

    	//console.log(JSON.stringify(comp))

    	if(f.valid && f.value.parola===f.value.parola2 && !!comp){
    		this._pservice.insertNewMemberAccount(JSON.stringify(comp)).then(
			    //used Arrow function here
			    (success)=> {
			      
			      console.log("oldu")
			      this.router.navigate(['/calisan-giris']);
			    }
			).catch(
			   //used Arrow function here
			   (err)=> {
			      console.log("olmadi");
			      this.router.navigate(['/home']);
			   }
			)
    	}
    	
    }
}