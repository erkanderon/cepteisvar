import { ElementRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pub } from '../../services/pub.service';

@Component({
  moduleId: module.id,
  selector: 'isveren-giris-comp',
  templateUrl: './isveren.giris.component.html',
  styleUrls: ['./isveren.giris.component.css']
})
export class IsverenGirisComponent {

	model: any = {};
    loading = false;
    returnUrl: string = "/is-veren-profil";
    cities: any;
    apiResponse: any;
    fields: any;
    wrong: any=false;


  constructor(
  	private _authService: AuthService,
  	private route: ActivatedRoute,
    private router: Router,
    private _pub: Pub
  	) { }


  	ngOnInit() {
	    //this.cities = this._authService.login('saygin.savran@cboxprojects.com', 'qwerty')
	    //console.log(this.cities);
      //this.fields = this._pub.getFieldList().then(res => this.fields = res);
	}
	login() {
	    this.loading = true;
	    this._authService.login(this.model.username, this.model.password, this.returnUrl, "business").then(res => this.getMessage());
	    //console.log(this._authService.getUser());
	}
  getMessage(){
    this.wrong = true;
    this.loading = false;
  }
}