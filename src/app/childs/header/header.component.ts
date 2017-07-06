import { Component } from '@angular/core';
import {AppSettings} from '../../config/app.settings';
import { Pub } from '../../services/pub.service';
import {Comment} from '../../models/comment'

@Component({
  moduleId: module.id,
  selector: 'header-comp',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Never Back Down';
  fields: any;
  ex: any;
  obj: any;
  
  constructor(private _pub: Pub) {
    
  }  
  ngOnInit() {
  	this.fields = this._pub.getFieldList().then(res => this.fields = this.formatFields(res));

  }
  ngAfterViewInit() {
  	
  	/*setTimeout(()=>{   
	      
	 },9000);*/
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
  
}