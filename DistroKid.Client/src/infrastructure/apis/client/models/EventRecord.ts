













import { mapValues } from '../runtime';
import type { UserRecord } from './UserRecord';
import {
    UserRecordFromJSON,
    UserRecordFromJSONTyped,
    UserRecordToJSON,
    UserRecordToJSONTyped,
} from './UserRecord';






export interface EventRecord {
    




    id: string;
    




    name: string;
    




    description: string;
    




    location: string;
    




    date: Date;
    




    artist: UserRecord;
}




export function instanceOfEventRecord(value: object): value is EventRecord {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('location' in value) || value['location'] === undefined) return false;
    if (!('date' in value) || value['date'] === undefined) return false;
    if (!('artist' in value) || value['artist'] === undefined) return false;
    return true;
}

export function EventRecordFromJSON(json: any): EventRecord {
    return EventRecordFromJSONTyped(json, false);
}

export function EventRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'description': json['description'],
        'location': json['location'],
        'date': (new Date(json['date'])),
        'artist': UserRecordFromJSON(json['artist']),
    };
}

export function EventRecordToJSON(json: any): EventRecord {
    return EventRecordToJSONTyped(json, false);
}

export function EventRecordToJSONTyped(value?: EventRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'description': value['description'],
        'location': value['location'],
        'date': value['date'].toISOString(),
        'artist': UserRecordToJSON(value['artist']),
    };
}

