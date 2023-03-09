export interface BreweryRequest {    
    name: string;
    type: string;
    street: string;
    city: string;
    county_province: string;
    postal_code: string;
    country: string;    
}


export interface BreweryResult {
    brewery_name: string;
    street_address: string;
    city: string;
    county_province: string;
    postal_code: string;
    country: string;
    brewery_type: string;
    result: string;
    is_active?: boolean;
    created_by?: number;
    updated_by?: number;
    updated_at?: string;
    id?: number;
    created_at?: string;
}
