
export class CreateBasketModel {

	public p_company_id: string;
	public p_basket_id: string;
	public p_sms_text: string;

    constructor(

		p_company_id: any,
		p_basket_id: any,
		p_sms_text: any
    ) { 
    	this.p_company_id = p_company_id;
    	this.p_basket_id = p_basket_id;
    	this.p_sms_text = p_sms_text;
    }   
}