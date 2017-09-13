export class SearchModel {

	public p_city_id: any;
	public p_job_id: any;
	public p_job_category_id: any;
	public p_company_id: any;
	public p_restrict_status: any;

    constructor(

		p_city_id: any,
		p_job_id: any,
		p_job_category_id: any,
		p_company_id: any,
		p_restrict_status: any,
	
    ) { 
    	this.p_city_id = p_city_id;
    	this.p_job_id = p_job_id;
    	this.p_job_category_id = p_job_category_id;
    	this.p_company_id = p_company_id;
    	this.p_restrict_status = p_restrict_status;

    }   
}
