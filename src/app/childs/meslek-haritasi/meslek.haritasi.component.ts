import { ElementRef, Component } from '@angular/core';
declare var jQuery : any;

@Component({
  moduleId: module.id,
  selector: 'meslekharitasi-comp',
  templateUrl: './meslek.haritasi.component.html',
  styleUrls: ['./meslek.haritasi.component.css']
})
export class MeslekHaritasiComponent {

	constructor(private elRef : ElementRef) { 
		jQuery(document).ready(function () {

  		});
	}
  
  	
}