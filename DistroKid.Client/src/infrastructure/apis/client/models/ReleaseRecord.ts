













import { mapValues } from '../runtime';
import type { PlatformRecord } from './PlatformRecord';
import {
    PlatformRecordFromJSON,
    PlatformRecordToJSON,
} from './PlatformRecord';
import type { TrackRecord } from './TrackRecord';
import {
    TrackRecordFromJSON,
    TrackRecordToJSON,
} from './TrackRecord';
import type { UserRecord } from './UserRecord';
import {
    UserRecordFromJSON,
    UserRecordToJSON,
} from './UserRecord';
import type { ReleaseTypeEnum } from './ReleaseTypeEnum';
import {
    ReleaseTypeEnumFromJSON,
    ReleaseTypeEnumToJSON,
} from './ReleaseTypeEnum';






export interface ReleaseRecord {
    




    id: string;
    




    title: string;
    




    releaseDate: Date;
    




    label: string;
    




    releaseType: ReleaseTypeEnum;
    




    tracks: Array<TrackRecord>;
    




    platforms: Array<PlatformRecord>;
    




    artist?: UserRecord | null;
}






export function instanceOfReleaseRecord(value: object): value is ReleaseRecord {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('releaseDate' in value) || value['releaseDate'] === undefined) return false;
    if (!('label' in value) || value['label'] === undefined) return false;
    if (!('releaseType' in value) || value['releaseType'] === undefined) return false;
    if (!('tracks' in value) || value['tracks'] === undefined) return false;
    if (!('platforms' in value) || value['platforms'] === undefined) return false;
    return true;
}

export function ReleaseRecordFromJSON(json: any): ReleaseRecord {
    return ReleaseRecordFromJSONTyped(json, false);
}

export function ReleaseRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReleaseRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'releaseDate': (new Date(json['releaseDate'])),
        'label': json['label'],
        'releaseType': ReleaseTypeEnumFromJSON(json['releaseType']),
        'tracks': ((json['tracks'] as Array<any>).map(TrackRecordFromJSON)),
        'platforms': ((json['platforms'] as Array<any>).map(PlatformRecordFromJSON)),
        'artist': json['artist'] == null ? undefined : UserRecordFromJSON(json['artist']),
    };
}

export function ReleaseRecordToJSON(json: any): ReleaseRecord {
    return ReleaseRecordToJSONTyped(json, false);
}

export function ReleaseRecordToJSONTyped(value?: ReleaseRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'releaseDate': value['releaseDate'].toISOString(),
        'label': value['label'],
        'releaseType': ReleaseTypeEnumToJSON(value['releaseType']),
        'tracks': ((value['tracks'] as Array<any>).map(TrackRecordToJSON)),
        'platforms': ((value['platforms'] as Array<any>).map(PlatformRecordToJSON)),
        'artist': value['artist'] == null ? value['artist'] : UserRecordToJSON(value['artist']),
    };
}

