













import { mapValues } from '../runtime';





export interface TrackUpdateRecord {
    




    id: string;
    




    title: string;
    




    durationInSeconds: number;
    




    isrc: string;
    




    artistId: string;
}




export function instanceOfTrackUpdateRecord(value: object): value is TrackUpdateRecord {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('durationInSeconds' in value) || value['durationInSeconds'] === undefined) return false;
    if (!('isrc' in value) || value['isrc'] === undefined) return false;
    if (!('artistId' in value) || value['artistId'] === undefined) return false;
    return true;
}

export function TrackUpdateRecordFromJSON(json: any): TrackUpdateRecord {
    return TrackUpdateRecordFromJSONTyped(json, false);
}

export function TrackUpdateRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackUpdateRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'durationInSeconds': json['durationInSeconds'],
        'isrc': json['isrc'],
        'artistId': json['artistId'],
    };
}

export function TrackUpdateRecordToJSON(json: any): TrackUpdateRecord {
    return TrackUpdateRecordToJSONTyped(json, false);
}

export function TrackUpdateRecordToJSONTyped(value?: TrackUpdateRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'durationInSeconds': value['durationInSeconds'],
        'isrc': value['isrc'],
        'artistId': value['artistId'],
    };
}

