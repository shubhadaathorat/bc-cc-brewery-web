import { Injectable } from '@angular/core';

export interface LocalStorageOptions {
    expireHours?: number;
    customExpiry?: number;
}


@Injectable()
export class LocalStorageService {
    constructor() {}
    /**
     * get local Storage Key 
     * @param {string} name
     * @returns {string}
     */
    public getWithExpiry(key) {
        const itemStr = localStorage.getItem(key);

        // if the item doesn't exist, return null
        if (!itemStr) {
            return null;
        }

        const item = JSON.parse(itemStr);
        const now = new Date();

        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem(key);
            return null;
        }
        return item.data;
    }

    /**
     * set localStorage
     * @param {string} key
     * @param {string} value
     * @param {boolean} isCustomExpiry if true then dont pass expireHours
     * @param {number} expireHours
     */
    public setWithExpiry(key, value, options?: LocalStorageOptions) {
        const now = new Date();
        // `item` is an object which contains the original value
        // as well as the time when it's supposed to expire
        const item = {
            data: value,
            expiry: options.customExpiry ? options.customExpiry : now.getTime() + (options.expireHours * 60 * 60 * 1000)
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    public removeItem(key) {
        localStorage.removeItem(key);
    }
}
