













import { mapValues } from '../runtime';





export interface MerchAddRecord {
    




    name: string;
    




    description: string;
    




    price: number;
    




    stock: number;
}




export function instanceOfMerchAddRecord(value: object): value is MerchAddRecord {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('price' in value) || value['price'] === undefined) return false;
    if (!('stock' in value) || value['stock'] === undefined) return false;
    return true;
}

export function MerchAddRecordFromJSON(json: any): MerchAddRecord {
    return MerchAddRecordFromJSONTyped(json, false);
}

export function MerchAddRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): MerchAddRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': json['description'],
        'price': json['price'],
        'stock': json['stock'],
    };
}

export function MerchAddRecordToJSON(json: any): MerchAddRecord {
    return MerchAddRecordToJSONTyped(json, false);
}

export function MerchAddRecordToJSONTyped(value?: MerchAddRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'description': value['description'],
        'price': value['price'],
        'stock': value['stock'],
    };
}

