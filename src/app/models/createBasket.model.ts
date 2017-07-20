
export class CreateBasketModel {

	public p_company_id: string;
	public p_member_id: string;
	public p_sms_text: string;

    constructor(

		p_company_id: any,
		p_member_id: any,
		p_sms_text: any
    ) { 
    	this.p_company_id = p_company_id;
    	this.p_member_id = p_member_id;
    	this.p_sms_text = p_sms_text;
    }   
}