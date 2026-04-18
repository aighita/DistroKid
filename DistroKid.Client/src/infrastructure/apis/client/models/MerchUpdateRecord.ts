













import { mapValues } from '../runtime';





export interface MerchUpdateRecord {
    




    name?: string | null;
    




    description?: string | null;
    




    price?: number | null;
    




    stock?: number | null;
}




export function instanceOfMerchUpdateRecord(value: object): value is MerchUpdateRecord {
    return true;
}

export function MerchUpdateRecordFromJSON(json: any): MerchUpdateRecord {
    return MerchUpdateRecordFromJSONTyped(json, false);
}

export function MerchUpdateRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): MerchUpdateRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
        'description': json['description'] == null ? undefined : json['description'],
        'price': json['price'] == null ? undefined : json['price'],
        'stock': json['stock'] == null ? undefined : json['stock'],
    };
}

export function MerchUpdateRecordToJSON(json: any): MerchUpdateRecord {
    return MerchUpdateRecordToJSONTyped(json, false);
}

export function MerchUpdateRecordToJSONTyped(value?: MerchUpdateRecord | null, ignoreDiscriminator: boolean = false): any {
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

