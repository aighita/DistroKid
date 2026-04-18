













import { mapValues } from '../runtime';





export interface PlatformAddRecord {
    




    name: string;
    




    url: string;
}




export function instanceOfPlatformAddRecord(value: object): value is PlatformAddRecord {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('url' in value) || value['url'] === undefined) return false;
    return true;
}

export function PlatformAddRecordFromJSON(json: any): PlatformAddRecord {
    return PlatformAddRecordFromJSONTyped(json, false);
}

export function PlatformAddRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlatformAddRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'url': json['url'],
    };
}

export function PlatformAddRecordToJSON(json: any): PlatformAddRecord {
    return PlatformAddRecordToJSONTyped(json, false);
}

export function PlatformAddRecordToJSONTyped(value?: PlatformAddRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'url': value['url'],
    };
}

