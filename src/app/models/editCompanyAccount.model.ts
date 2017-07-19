export class EditCompanyAccountModel {

	public p_company_id: string;
    public P_COMPANY_NAME: string;
    public P_TAX_NUMBER: number;
    public P_TAX_REGION: number;
    public P_ADDRESS: string;
    public P_COMPANY_CONTACT: number;
    public P_CITY: string;
    public P_CONTACT_PERSON: number;
    public P_CONTACT_NO: number;
    public P_COUNTY: string;
    public P_BUSINESS_TYPE: number;


    constructor(

		p_company_id: any, 
	    P_COMPANY_NAME: any, 
        P_TAX_NUMBER: any,
		P_TAX_REGION: any, 
		P_ADDRESS: any, 
        P_COMPANY_CONTACT: any,
        P_CITY: any,
        P_CONTACT_PERSON: any, 
        P_CONTACT_NO: any,
        P_COUNTY: any, 
		P_BUSINESS_TYPE: any, 
        
    ) { 
        this.p_company_id = p_company_id;
    	this.P_COMPANY_NAME = P_COMPANY_NAME;
    	this.P_TAX_NUMBER = P_TAX_NUMBER
    	this.P_TAX_REGION = P_TAX_REGION
    	this.P_ADDRESS = P_ADDRESS
    	this.P_COMPANY_CONTACT = P_COMPANY_CONTACT
    	this.P_CITY = P_CITY
    	this.P_CONTACT_PERSON = P_CONTACT_PERSON
    	this.P_CONTACT_NO = P_CONTACT_NO
    	this.P_COUNTY = P_COUNTY
    	this.P_BUSINESS_TYPE = P_BUSINESS_TYPE
    }   
}

