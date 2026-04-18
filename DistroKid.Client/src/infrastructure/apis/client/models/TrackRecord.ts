













import { mapValues } from '../runtime';
import type { UserRecord } from './UserRecord';
import {
    UserRecordFromJSON,
    UserRecordToJSON,
} from './UserRecord';





export interface TrackRecord {
    




    id: string;
    




    title: string;
    




    durationInSeconds: number;
    




    isrc: string;
    




    artistId: string;
    




    artist?: UserRecord | null;
}




export function instanceOfTrackRecord(value: object): value is TrackRecord {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('durationInSeconds' in value) || value['durationInSeconds'] === undefined) return false;
    if (!('isrc' in value) || value['isrc'] === undefined) return false;
    if (!('artistId' in value) || value['artistId'] === undefined) return false;
    return true;
}

export function TrackRecordFromJSON(json: any): TrackRecord {
    return TrackRecordFromJSONTyped(json, false);
}

export function TrackRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'durationInSeconds': json['durationInSeconds'],
        'isrc': json['isrc'],
        'artistId': json['artistId'],
        'artist': json['artist'] == null ? undefined : UserRecordFromJSON(json['artist']),
    };
}

export function TrackRecordToJSON(json: any): TrackRecord {
    return TrackRecordToJSONTyped(json, false);
}

export function TrackRecordToJSONTyped(value?: TrackRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'durationInSeconds': value['durationInSeconds'],
        'isrc': value['isrc'],
        'artistId': value['artistId'],
        'artist': value['artist'] == null ? value['artist'] : UserRecordToJSON(value['artist']),
    };
}

