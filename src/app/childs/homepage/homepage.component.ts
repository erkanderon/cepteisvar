import { ElementRef, Component , ViewChild } from '@angular/core';
import { Pub } from '../../services/pub.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Return} from '../../models/return.model';
import {NgForm} from '@angular/forms';
import { SearchModel } from '../../models/searchModel';
declare var jQuery : any;

@Component({
  moduleId: module.id,
  selector: 'home-comp',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [AuthService]
})
export class HomeComponent {
	cities: any;
	education: any;
	jobs: any={};
	profiles: any;
	fields: any;
	obj: any;
	news: any;
	statistics: any;
	islogged: any=false;
	jobcategory: any={};

	jobcat: any="Kategori Seciniz";
	searchIsModel: any=[];

	

	constructor(private elRef : ElementRef, private _pub: Pub, private _auth: AuthService, private router: Router) { 

		// JQuery Defines
		jQuery(document).ready(function () {

			var options = [];

			jQuery( '.dropdown-menu a' ).on( 'click', function( event ) {

			   var $target = jQuery( event.currentTarget ),
			       val = $target.attr( 'data-value' ),
			       $inp = $target.find( 'input' ),
			       idx;

			   if ( ( idx = options.indexOf( val ) ) > -1 ) {
			      options.splice( idx, 1 );
			      setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
			   } else {
			      options.push( val );
			      setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
			   }

			   jQuery( event.target ).blur();
			      
			   console.log( options );
			   return false;
			});

			
	  		
			jQuery("#firms").slick({"slidesToShow": 8, "slidesToScroll": 1, "speed": 300, "infinite": true, "lazyLoad": 'ondemand'});
  		});
  		// JQuery finished

  		if(!!localStorage.getItem('userrole')){
  			this.islogged = (this._auth.isLoggedIn())&&(localStorage.getItem('userrole')==='member');
  		}

	}
	ngOnInit() {

	    this.cities = this._pub.getCities().then(cities => this.cities = cities);
	    this.education = this._pub.getEducationTypes().then(education => this.education = education);
	    this.jobcategory = this._pub.getJobCategories().then(jobcategory => this.jobcategory = jobcategory);
	    this.profiles = this._pub.getHomepageMembers().then(profiles => this.profiles = profiles);
	    this.fields = this._pub.getFieldList().then(res => this.fields = this.formatFields(res));
	    this.news = this._pub.getNews().then(res => this.news = res);
	    this.statistics = this._pub.getJobStatistics().then(res => this.statistics = res);
	    console.log(this.profiles)
	}
	ngAfterContentInit() {

	}
	formatFields(f) {
	  	this.obj = {};
	  	if(f.data){
		  	for (let items of f.data) {
		  		this.obj[items.ITEM] = items.TEXT
			}
		}
		return this.obj;
	}

	onJobChange(newValue) {
    
    this.jobs = this._pub.getJobFieldList(newValue).then(jobs => this.jobs = jobs);

  	}
	checkUser(){
		this.islogged = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='business');
		console.log(this.islogged);
		if(!this.islogged){
			this.router.navigate(['/calisan-arama']);
		}else{
			this.router.navigate(['/isveren-giris']);
		}
	}
	checkCompany(param){
		this.islogged = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='business');
		
		console.log(this.islogged);
		if(this.islogged){
			this.router.navigate(['/calisan-profil', param]);
		}else{
			this.router.navigate(['/isveren-giris']);
		}
	}
	checkMember(){
		this.islogged = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='member');
		
		console.log(this.islogged);
		if(this.islogged){
			this.router.navigate(['/is-arayan-profil']);
		}else{
			this.router.navigate(['/calisan-giris']);
		}
	}
	addToModel(val, jid){

		if(val.target.checked){
			this.searchIsModel.push(jid);
		}else{
			let index = this.searchIsModel.indexOf(jid, 0);
			if (index > -1) {
			   this.searchIsModel.splice(index, 1);
			}
		}
	}
	search(fav: NgForm) {

		console.log(this.cities);

	
	    if(!parseInt(fav.value.il)===false && !parseInt(fav.value.jobcat)===false && this.searchIsModel.length != 0){ 

	    	this._pub.searchParams = new SearchModel(parseInt(fav.value.il), this.searchIsModel, null)
	    	this._pub.searchModel = parseInt(fav.value.jobcat);
	    	this.router.navigate( ['/calisan-arama']);
	    }else{
	    	//Give Message Not Valid Form
	    }
	 
	      
	    
	}
}