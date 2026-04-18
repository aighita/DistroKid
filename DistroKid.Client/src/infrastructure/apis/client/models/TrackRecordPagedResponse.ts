













import { mapValues } from '../runtime';
import type { TrackRecord } from './TrackRecord';
import {
    TrackRecordFromJSON,
    TrackRecordFromJSONTyped,
    TrackRecordToJSON,
    TrackRecordToJSONTyped,
} from './TrackRecord';






export interface TrackRecordPagedResponse {
    




    page: number;
    




    pageSize: number;
    




    totalCount: number;
    




    data: Array<TrackRecord>;
}




export function instanceOfTrackRecordPagedResponse(value: object): value is TrackRecordPagedResponse {
    if (!('page' in value) || value['page'] === undefined) return false;
    if (!('pageSize' in value) || value['pageSize'] === undefined) return false;
    if (!('totalCount' in value) || value['totalCount'] === undefined) return false;
    if (!('data' in value) || value['data'] === undefined) return false;
    return true;
}

export function TrackRecordPagedResponseFromJSON(json: any): TrackRecordPagedResponse {
    return TrackRecordPagedResponseFromJSONTyped(json, false);
}

export function TrackRecordPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackRecordPagedResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'page': json['page'],
        'pageSize': json['pageSize'],
        'totalCount': json['totalCount'],
        'data': ((json['data'] as Array<any>).map(TrackRecordFromJSON)),
    };
}

export function TrackRecordPagedResponseToJSON(json: any): TrackRecordPagedResponse {
    return TrackRecordPagedResponseToJSONTyped(json, false);
}

export function TrackRecordPagedResponseToJSONTyped(value?: TrackRecordPagedResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'page': value['page'],
        'pageSize': value['pageSize'],
        'totalCount': value['totalCount'],
        'data': ((value['data'] as Array<any>).map(TrackRecordToJSON)),
    };
}

