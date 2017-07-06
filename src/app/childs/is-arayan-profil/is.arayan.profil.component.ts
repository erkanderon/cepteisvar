import { ElementRef, Component } from '@angular/core';
declare var jQuery : any;
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'isarayanprofil-comp',
  templateUrl: './is.arayan.profil.component.html',
  styleUrls: ['./is.arayan.profil.component.css'],
  providers: [AuthService]
})
export class IsArayanProfilComponent {

	constructor(
		private _authService: AuthService, 
		private router: Router, 
		private elRef : ElementRef) { 
		jQuery(document).ready(function () {

  		});

		if(this._authService.refreshToken()){
  			this.router.navigate(['/home']);
  		}
	}
  
  	
}