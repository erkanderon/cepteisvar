import { Component } from '@angular/core';
import { Pub } from '../../services/pub.service';
import {Comment} from '../../models/comment'

@Component({
  moduleId: module.id,
  selector: 'footer-comp',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  
  fields: any;
  obj: any;


  constructor(private _pub: Pub) {
    
  } 

  ngOnInit() {
  	this.fields = this._pub.getFieldList().then(res => this.fields = this.formatFields(res));

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