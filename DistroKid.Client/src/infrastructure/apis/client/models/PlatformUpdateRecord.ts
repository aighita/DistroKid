













import { mapValues } from '../runtime';





export interface PlatformUpdateRecord {
    




    name?: string | null;
    




    url?: string | null;
}




export function instanceOfPlatformUpdateRecord(value: object): value is PlatformUpdateRecord {
    return true;
}

export function PlatformUpdateRecordFromJSON(json: any): PlatformUpdateRecord {
    return PlatformUpdateRecordFromJSONTyped(json, false);
}

export function PlatformUpdateRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlatformUpdateRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
        'url': json['url'] == null ? undefined : json['url'],
    };
}

export function PlatformUpdateRecordToJSON(json: any): PlatformUpdateRecord {
    return PlatformUpdateRecordToJSONTyped(json, false);
}

export function PlatformUpdateRecordToJSONTyped(value?: PlatformUpdateRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'url': value['url'],
    };
}

