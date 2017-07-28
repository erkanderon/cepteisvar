export class Company {

	public P_COMPANY_NAME: string;
    public P_TAX_NUMBER: string;
    public P_TAX_REGION: string;
    public P_ADDRESS: string;
    public P_COMPANY_CONTACT: string;
    public P_CITY: string;
    public P_EMAIL: string;
    public P_CONTACT_PERSON: string;
    public p_contact_no: string;
    public P_COUNTY: number;
    public P_BUSINESS_TYPE: string;
    public P_PWD: string;

    constructor(

		P_COMPANY_NAME: any, 
	    P_TAX_NUMBER: any, 
		P_TAX_REGION: any, 
		P_ADDRESS: any, 
		P_COMPANY_CONTACT: any, 
		P_CITY: any, 
		P_EMAIL: any, 
		P_CONTACT_PERSON: any, 
		p_contact_no: any, 
		P_COUNTY: any, 
		P_BUSINESS_TYPE: any, 
		P_PWD: any 
    ) { 
    	this.P_COMPANY_NAME = P_COMPANY_NAME;
    	this.P_TAX_NUMBER = P_TAX_NUMBER
    	this.P_TAX_REGION = P_TAX_REGION
    	this.P_ADDRESS = P_ADDRESS
    	this.P_COMPANY_CONTACT = P_COMPANY_CONTACT
    	this.P_CITY = P_CITY
    	this.P_EMAIL = P_EMAIL
    	this.P_CONTACT_PERSON = P_CONTACT_PERSON
    	this.p_contact_no = p_contact_no
    	this.P_COUNTY = P_COUNTY
    	this.P_BUSINESS_TYPE = P_BUSINESS_TYPE
    	this.P_PWD = P_PWD
    }   
}
