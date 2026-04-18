













import { mapValues } from '../runtime';





export interface PlatformRecord {
    




    id: string;
    




    name: string;
    




    url: string;
}




export function instanceOfPlatformRecord(value: object): value is PlatformRecord {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('url' in value) || value['url'] === undefined) return false;
    return true;
}

export function PlatformRecordFromJSON(json: any): PlatformRecord {
    return PlatformRecordFromJSONTyped(json, false);
}

export function PlatformRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlatformRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'url': json['url'],
    };
}

export function PlatformRecordToJSON(json: any): PlatformRecord {
    return PlatformRecordToJSONTyped(json, false);
}

export function PlatformRecordToJSONTyped(value?: PlatformRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'url': value['url'],
    };
}

