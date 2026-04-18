













import { mapValues } from '../runtime';
import type { ReleaseRecord } from './ReleaseRecord';
import {
    ReleaseRecordFromJSON,
    ReleaseRecordFromJSONTyped,
    ReleaseRecordToJSON,
    ReleaseRecordToJSONTyped,
} from './ReleaseRecord';
import type { UserRecord } from './UserRecord';
import {
    UserRecordFromJSON,
    UserRecordFromJSONTyped,
    UserRecordToJSON,
    UserRecordToJSONTyped,
} from './UserRecord';






export interface LabelRecord {
    




    id: string;
    




    name: string;
    




    website: string;
    




    releases: Array<ReleaseRecord>;
    




    artists: Array<UserRecord>;
    




    managers: Array<UserRecord>;
}




export function instanceOfLabelRecord(value: object): value is LabelRecord {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('website' in value) || value['website'] === undefined) return false;
    if (!('releases' in value) || value['releases'] === undefined) return false;
    if (!('artists' in value) || value['artists'] === undefined) return false;
    if (!('managers' in value) || value['managers'] === undefined) return false;
    return true;
}

export function LabelRecordFromJSON(json: any): LabelRecord {
    return LabelRecordFromJSONTyped(json, false);
}

export function LabelRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): LabelRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'website': json['website'],
        'releases': ((json['releases'] as Array<any>).map(ReleaseRecordFromJSON)),
        'artists': ((json['artists'] as Array<any>).map(UserRecordFromJSON)),
        'managers': ((json['managers'] as Array<any>).map(UserRecordFromJSON)),
    };
}

export function LabelRecordToJSON(json: any): LabelRecord {
    return LabelRecordToJSONTyped(json, false);
}

export function LabelRecordToJSONTyped(value?: LabelRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'website': value['website'],
        'releases': ((value['releases'] as Array<any>).map(ReleaseRecordToJSON)),
        'artists': ((value['artists'] as Array<any>).map(UserRecordToJSON)),
        'managers': ((value['managers'] as Array<any>).map(UserRecordToJSON)),
    };
}

