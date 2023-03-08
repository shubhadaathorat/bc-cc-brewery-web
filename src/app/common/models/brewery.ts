export interface BreweryRequest {    
    name: string;
    breweryType: string;
    street: string;
    city: string;
    county_province: string;
    postal_code: string;
    country: string;    
}

export interface BreweryResponse {
    status: string;
    code: number;
    data: BreweryResult[]
}

export interface BreweryResult {
    name: string;
    breweryType: string;
    street: string;
    city: string;
    county_province: string;
    postal_code: string;
    country: string;
    result:string,
    message : string;
}
