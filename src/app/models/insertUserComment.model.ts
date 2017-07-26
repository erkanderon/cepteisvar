export class InsertCommentModel {

	public p_company_id: string;
	public P_COMMENT_TEXT: string;
	public P_RATING: string;
	public P_USERID: string;
	public p_basket_id: string;

    constructor(

		p_company_id: any,
		P_COMMENT_TEXT: any,
		P_RATING: any,
		P_USERID: any,
		p_basket_id: any,
    ) { 
    	this.p_company_id = p_company_id;
    	this.P_COMMENT_TEXT = P_COMMENT_TEXT;
    	this.P_RATING = P_RATING;
    	this.P_USERID = P_USERID;
    	this.p_basket_id = p_basket_id;
    }   
}