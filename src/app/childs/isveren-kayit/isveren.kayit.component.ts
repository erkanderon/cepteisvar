import { ElementRef, Component, } from '@angular/core';
import { Pub } from '../../services/pub.service';
import { PostService } from '../../services/post.service'
import {NgForm} from '@angular/forms';
import {Company} from '../../models/company.model';
import { Router, ActivatedRoute } from '@angular/router';
declare var jQuery : any;
declare var FileInput : any;

@Component({
  moduleId: module.id,
  selector: 'isveren-comp',
  templateUrl: './isveren.kayit.component.html',
  styleUrls: ['./isveren.kayit.component.css'],
 
})
export class IsverenKayitComponent {
  
  cities: any;
  ct: any = 0;
  selectedDevice: any;
  areas: any;
  epost: any;

    constructor(private elRef : ElementRef, private _pub: Pub, private _pservice: PostService, private router: Router,) { 
		jQuery(document).ready(function () {

	  		
  		});
	}
	ngOnInit() {
	    this.cities = this._pub.getCities().then(cities => this.cities = cities);
	    this.areas = this._pub.getCompanyBusinessArea().then(areas => this.areas = areas);
	    console.log(this.cities)
	}
	onChange(newValue) {
	    
	    this.ct = this._pub.getCityFieldList(newValue).then(ct => this.ct = ct);
	    console.log(this.ct.data);
	    this.selectedDevice = newValue;
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
    	let comp = new Company(f.value.firma, f.value.tckimlik.toString(), f.value.vergi, f.value.address, f.value.telefon.toString(), parseInt(f.value.sel2), f.value.eposta, f.value.yetkili, f.value.yettel.toString(), parseInt(f.value.cname), parseInt(f.value.isalani), f.value.parola);

    	//console.log(JSON.stringify(comp))
    	this.epost = f.value.eposta;
    	if(f.valid && f.value.parola===f.value.parola2 && !!comp){
    		this._pservice.insertNewCompanyAccount(JSON.stringify(comp)).then(
			    //used Arrow function here
			    (success)=> {
			      
			      console.log("oldu")
			      //this.router.navigate(['/isveren-giris']);
			    }
			).catch(
			   //used Arrow function here
			   (err)=> {
			      console.log("olmadi");
			      //this.router.navigate(['/home']);
			   }
			)
    	}
    	
    }
    validate(f: NgForm) {

   		
		this._pservice.validateMemberAccount({ "p_email": this.epost, "p_sms_code": f.value.validatekod }).then(
		    //used Arrow function here
		    (success)=> {
		      
		      if(this.responser(success)){
		      	this.router.navigate(['/isveren-giris']);
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