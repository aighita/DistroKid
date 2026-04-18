













import { mapValues } from '../runtime';





export interface LabelAddRecord {
    




    name: string;
    




    website: string;
}




export function instanceOfLabelAddRecord(value: object): value is LabelAddRecord {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('website' in value) || value['website'] === undefined) return false;
    return true;
}

export function LabelAddRecordFromJSON(json: any): LabelAddRecord {
    return LabelAddRecordFromJSONTyped(json, false);
}

export function LabelAddRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): LabelAddRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'website': json['website'],
    };
}

export function LabelAddRecordToJSON(json: any): LabelAddRecord {
    return LabelAddRecordToJSONTyped(json, false);
}

export function LabelAddRecordToJSONTyped(value?: LabelAddRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'website': value['website'],
    };
}

