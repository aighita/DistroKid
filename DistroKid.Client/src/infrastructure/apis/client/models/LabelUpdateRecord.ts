













import { mapValues } from '../runtime';





export interface LabelUpdateRecord {
    




    name?: string | null;
    




    website?: string | null;
}




export function instanceOfLabelUpdateRecord(value: object): value is LabelUpdateRecord {
    return true;
}

export function LabelUpdateRecordFromJSON(json: any): LabelUpdateRecord {
    return LabelUpdateRecordFromJSONTyped(json, false);
}

export function LabelUpdateRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): LabelUpdateRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
        'website': json['website'] == null ? undefined : json['website'],
    };
}

export function LabelUpdateRecordToJSON(json: any): LabelUpdateRecord {
    return LabelUpdateRecordToJSONTyped(json, false);
}

export function LabelUpdateRecordToJSONTyped(value?: LabelUpdateRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'website': value['website'],
    };
}

