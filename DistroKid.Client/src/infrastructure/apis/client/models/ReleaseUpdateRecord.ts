













import { mapValues } from '../runtime';
import type { ReleaseTypeEnum } from './ReleaseTypeEnum';
import {
    ReleaseTypeEnumFromJSON,
    ReleaseTypeEnumFromJSONTyped,
    ReleaseTypeEnumToJSON,
    ReleaseTypeEnumToJSONTyped,
} from './ReleaseTypeEnum';






export interface ReleaseUpdateRecord {
    




    title?: string | null;
    




    label?: string | null;
    




    releaseType?: ReleaseTypeEnum | null;
    




    releaseDate?: Date | null;
    




    trackIds?: Array<string> | null;
    




    platformIds?: Array<string> | null;
}






export function instanceOfReleaseUpdateRecord(value: object): value is ReleaseUpdateRecord {
    return true;
}

export function ReleaseUpdateRecordFromJSON(json: any): ReleaseUpdateRecord {
    return ReleaseUpdateRecordFromJSONTyped(json, false);
}

export function ReleaseUpdateRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReleaseUpdateRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'] == null ? undefined : json['title'],
        'label': json['label'] == null ? undefined : json['label'],
        'releaseType': json['releaseType'] == null ? undefined : ReleaseTypeEnumFromJSON(json['releaseType']),
        'releaseDate': json['releaseDate'] == null ? undefined : (new Date(json['releaseDate'])),
        'trackIds': json['trackIds'] == null ? undefined : json['trackIds'],
        'platformIds': json['platformIds'] == null ? undefined : json['platformIds'],
    };
}

export function ReleaseUpdateRecordToJSON(json: any): ReleaseUpdateRecord {
    return ReleaseUpdateRecordToJSONTyped(json, false);
}

export function ReleaseUpdateRecordToJSONTyped(value?: ReleaseUpdateRecord | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'title': value['title'],
        'label': value['label'],
        'releaseType': ReleaseTypeEnumToJSON(value['releaseType']),
        'releaseDate': value['releaseDate'] == null ? value['releaseDate'] : value['releaseDate'].toISOString(),
        'trackIds': value['trackIds'],
        'platformIds': value['platformIds'],
    };
}

