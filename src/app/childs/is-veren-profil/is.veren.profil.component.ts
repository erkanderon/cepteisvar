import { ElementRef, Component } from '@angular/core';
declare var jQuery : any;

@Component({
  moduleId: module.id,
  selector: 'isverenprofil-comp',
  templateUrl: './is.veren.profil.component.html',
  styleUrls: ['./is.veren.profil.component.css']
})
export class IsVerenProfilComponent {

	constructor(private elRef : ElementRef) { 
		jQuery(document).ready(function () {

  		});
	}
  
  	
}