import { ElementRef, Component , ViewChild } from '@angular/core';
import { Pub } from '../../services/pub.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Return} from '../../models/return.model';
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
	jobs: any;
	profiles: any;
	fields: any;
	obj: any;
	news: any;
	statistics: any;
	isloggedin: any=false;

	

	constructor(private elRef : ElementRef, private _pub: Pub, private _auth: AuthService, private router: Router) { 

		// JQuery Defines
		jQuery(document).ready(function () {

			/*jQuery("#ss").slick(
		  		{
			  		"slidesToShow": 4, 
			  		"slidesToScroll": 1, 
			  		"speed": 300, 
			  		"infinite": true, 
			  		"lazyLoad": 'ondemand'
		  		}
	  		);*/
			
	  		
			jQuery("#firms").slick({"slidesToShow": 8, "slidesToScroll": 1, "speed": 300, "infinite": true, "lazyLoad": 'ondemand'});
  		});
  		// JQuery finished

  		

	}
	ngOnInit() {

	    this.cities = this._pub.getCities().then(cities => this.cities = cities);
	    this.education = this._pub.getEducationTypes().then(education => this.education = education);
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
	checkUser(){
		this.isloggedin = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='business');
		console.log(this.isloggedin);
		if(this.isloggedin){
			this.router.navigate(['/calisan-arama']);
		}else{
			this.router.navigate(['/isveren-giris']);
		}
	}
	checkCompany(param){
		this.isloggedin = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='business');
		
		console.log(this.isloggedin);
		if(this.isloggedin){
			this.router.navigate(['/calisan-profil', param]);
		}else{
			this.router.navigate(['/isveren-giris']);
		}
	}
	checkMember(){
		this.isloggedin = (this._auth.isLoggedIn()&&localStorage.getItem('userrole')==='member');
		
		console.log(this.isloggedin);
		if(this.isloggedin){
			this.router.navigate(['/is-arayan-profil']);
		}else{
			this.router.navigate(['/calisan-giris']);
		}
	}
}