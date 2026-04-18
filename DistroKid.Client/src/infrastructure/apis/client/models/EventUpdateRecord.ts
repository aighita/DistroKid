













import { mapValues } from '../runtime';





export interface EventUpdateRecord {
    




    name?: string | null;
    




    description?: string | null;
    




    location?: string | null;
    




    date?: Date | null;
}




export function instanceOfEventUpdateRecord(value: object): value is EventUpdateRecord {
    return true;
}

export function EventUpdateRecordFromJSON(json: any): EventUpdateRecord {
    return EventUpdateRecordFromJSONTyped(json, false);
}

export function EventUpdateRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventUpdateRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
        'description': json['description'] == null ? undefined : json['description'],
        'location': json['location'] == null ? undefined : json['location'],
        'date': json['date'] == null ? undefined : (new Date(json['date'])),
    };
}

export function EventUpdateRecordToJSON(json: any): EventUpdateRecord {
    return EventUpdateRecordToJSONTyped(json, false);
}

export function EventUpdateRecordToJSONTyped(value?: EventUpdateRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'description': value['description'],
        'location': value['location'],
        'date': value['date'] == null ? value['date'] : value['date'].toISOString(),
    };
}

