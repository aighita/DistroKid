













import { mapValues } from '../runtime';
import type { ReleaseTypeEnum } from './ReleaseTypeEnum';
import {
    ReleaseTypeEnumFromJSON,
    ReleaseTypeEnumFromJSONTyped,
    ReleaseTypeEnumToJSON,
    ReleaseTypeEnumToJSONTyped,
} from './ReleaseTypeEnum';






export interface ReleaseAddRecord {
    




    title: string;
    




    label: string;
    




    releaseType: ReleaseTypeEnum;
    




    releaseDate: Date;
    




    trackIds: Array<string>;
    




    platformIds: Array<string>;
    




    artistId?: string | null;
}






export function instanceOfReleaseAddRecord(value: object): value is ReleaseAddRecord {
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('label' in value) || value['label'] === undefined) return false;
    if (!('releaseType' in value) || value['releaseType'] === undefined) return false;
    if (!('releaseDate' in value) || value['releaseDate'] === undefined) return false;
    if (!('trackIds' in value) || value['trackIds'] === undefined) return false;
    if (!('platformIds' in value) || value['platformIds'] === undefined) return false;
    return true;
}

export function ReleaseAddRecordFromJSON(json: any): ReleaseAddRecord {
    return ReleaseAddRecordFromJSONTyped(json, false);
}

export function ReleaseAddRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReleaseAddRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'],
        'label': json['label'],
        'releaseType': ReleaseTypeEnumFromJSON(json['releaseType']),
        'releaseDate': (new Date(json['releaseDate'])),
        'trackIds': json['trackIds'],
        'platformIds': json['platformIds'],
        'artistId': json['artistId'] == null ? undefined : json['artistId'],
    };
}

export function ReleaseAddRecordToJSON(json: any): ReleaseAddRecord {
    return ReleaseAddRecordToJSONTyped(json, false);
}

export function ReleaseAddRecordToJSONTyped(value?: ReleaseAddRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'title': value['title'],
        'label': value['label'],
        'releaseType': ReleaseTypeEnumToJSON(value['releaseType']),
        'releaseDate': value['releaseDate'].toISOString(),
        'trackIds': value['trackIds'],
        'platformIds': value['platformIds'],
        'artistId': value['artistId'],
    };
}

