export class SetNoCommentModel {

	public p_company_id: any;
	public p_member_id: any;
	public p_basket_id: any;
	public p_reason_type: any;

    constructor(

		p_company_id: any,
		p_member_id: any,
		p_basket_id: any,
		p_reason_type: any
    ) { 
    	this.p_company_id = p_company_id;
    	this.p_member_id = p_member_id;
    	this.p_basket_id = p_basket_id;
    	this.p_reason_type = p_reason_type;
    }   
}
