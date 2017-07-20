import { ElementRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pub } from '../../services/pub.service';


@Component({
  moduleId: module.id,
  selector: 'calisan-giris-comp',
  templateUrl: './reset.password.component.html',
  styleUrls: ['./reset.password.component.css'],
})
export class ResetPasswordComponent {
  
    model: any = {};
    loading = false;
    returnUrl: string = "/is-arayan-profil";
    cities: any;
    apiResponse: any;
    fields: any;
    codeModal: any = false;

  constructor(
  	private _authService: AuthService,
  	private route: ActivatedRoute,
    private router: Router,
    private _pub: Pub
  	) { 

  }
  ngOnInit() {
	    //this.cities = this._authService.login('saygin.savran@cboxprojects.com', 'qwerty')
	    //console.log(this.cities);
      //this.fields = this._pub.getFieldList().then(res => this.fields = res);
	}
  reset() {
        this.loading = true;
        this._pub.resetPassword(this.model.username).then(res => this.handleReset(res));
  }
  handleReset(param){
      if(param.code === 200){
        document.getElementById("openModalButton").click();
        this.loading = false;
      }else{
        // handle the wrong user
        this.loading = false;
        console.log(param)
      }
  }

  
}