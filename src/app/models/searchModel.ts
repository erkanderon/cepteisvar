export class SearchModel {

	public p_city_id: string;
	public p_job_id: string;
	public p_education: string;

    constructor(

		p_city_id: any,
		p_job_id: any,
		p_education: any,
	
    ) { 
    	this.p_city_id = p_city_id;
    	this.p_job_id = p_job_id;
    	this.p_education = p_education;

    }   
}