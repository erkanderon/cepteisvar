import { ElementRef, Component, ViewChild } from '@angular/core';
import { Pub } from '../../services/pub.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var jQuery : any;
declare var List : any;

@Component({
  moduleId: module.id,
  selector: 'src-comp',
  templateUrl: './arama.component.html',
  styleUrls: ['./arama.component.css'],
  
})
export class AramaComponent {

	profiles: any = {};
	model: any = [];
	saveUsername: any = false;
	islogged:any = false;

	constructor(private elRef : ElementRef, private _pub: Pub, private _auth: AuthService, private router: Router) {}

	ngOnInit() {
		jQuery(document).ready(function () {


		    jQuery('#list').click(function(event){event.preventDefault();jQuery('#products .item').addClass('list-group-item');});
		    jQuery('#grid').click(function(event){event.preventDefault();jQuery('#products .item').removeClass('list-group-item');jQuery('#products .item').addClass('grid-group-item');});

		    jQuery(function() {
			    var monkeyList = new List('products', {
			      valueNames: ['name'],
			      page: 9,
			      pagination: true
			    });

				});
	  		});

	    this.profiles = this._pub.getHomepageMembers().then(profiles => this.profiles = profiles);

	    if(!!localStorage.getItem('userrole')){
  			this.islogged = (this._auth.isLoggedIn())&&(localStorage.getItem('userrole')==='business');
  		}

	    
	}

	addToModel(val, user){

		if(val.target.checked){
			this.model.push(user);
		}else{
			let index = this.model.indexOf(user, 0);
			if (index > -1) {
			   this.model.splice(index, 1);
			}
		}
	}

	createSepet(){
		
		this._pub.sepetModel = this.model;
		this.router.navigate(['/is-veren-profil',{ foo: "sepetim" }]);

	}
  
  	
}