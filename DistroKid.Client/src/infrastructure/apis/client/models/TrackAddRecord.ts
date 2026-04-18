













import { mapValues } from '../runtime';





export interface TrackAddRecord {
    




    title: string;
    




    durationInSeconds: number;
    




    isrc: string;
    




    artistId: string;
}




export function instanceOfTrackAddRecord(value: object): value is TrackAddRecord {
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('durationInSeconds' in value) || value['durationInSeconds'] === undefined) return false;
    if (!('isrc' in value) || value['isrc'] === undefined) return false;
    if (!('artistId' in value) || value['artistId'] === undefined) return false;
    return true;
}

export function TrackAddRecordFromJSON(json: any): TrackAddRecord {
    return TrackAddRecordFromJSONTyped(json, false);
}

export function TrackAddRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackAddRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'],
        'durationInSeconds': json['durationInSeconds'],
        'isrc': json['isrc'],
        'artistId': json['artistId'],
    };
}

export function TrackAddRecordToJSON(json: any): TrackAddRecord {
    return TrackAddRecordToJSONTyped(json, false);
}

export function TrackAddRecordToJSONTyped(value?: TrackAddRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'title': value['title'],
        'durationInSeconds': value['durationInSeconds'],
        'isrc': value['isrc'],
        'artistId': value['artistId'],
    };
}

