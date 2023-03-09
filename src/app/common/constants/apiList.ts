export const urls ={
    "login" : 'login',
    "breweries" : 'breweries',
    "mismatchBreweries" : (type: string, province:string) => `breweries/mismatch?type=${type}&provience=${province}`,
}