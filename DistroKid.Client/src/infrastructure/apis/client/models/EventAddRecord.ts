













import { mapValues } from '../runtime';





export interface EventAddRecord {
    




    name: string;
    




    description: string;
    




    location: string;
    




    date: Date;
}




export function instanceOfEventAddRecord(value: object): value is EventAddRecord {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('location' in value) || value['location'] === undefined) return false;
    if (!('date' in value) || value['date'] === undefined) return false;
    return true;
}

export function EventAddRecordFromJSON(json: any): EventAddRecord {
    return EventAddRecordFromJSONTyped(json, false);
}

export function EventAddRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventAddRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': json['description'],
        'location': json['location'],
        'date': (new Date(json['date'])),
    };
}

export function EventAddRecordToJSON(json: any): EventAddRecord {
    return EventAddRecordToJSONTyped(json, false);
}

export function EventAddRecordToJSONTyped(value?: EventAddRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'description': value['description'],
        'location': value['location'],
        'date': value['date'].toISOString(),
    };
}

