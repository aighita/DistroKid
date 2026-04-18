













import { mapValues } from '../runtime';
import type { LabelRecord } from './LabelRecord';
import {
    LabelRecordFromJSON,
    LabelRecordFromJSONTyped,
    LabelRecordToJSON,
    LabelRecordToJSONTyped,
} from './LabelRecord';






export interface LabelRecordPagedResponse {
    




    page: number;
    




    pageSize: number;
    




    totalCount: number;
    




    data: Array<LabelRecord>;
}




export function instanceOfLabelRecordPagedResponse(value: object): value is LabelRecordPagedResponse {
    if (!('page' in value) || value['page'] === undefined) return false;
    if (!('pageSize' in value) || value['pageSize'] === undefined) return false;
    if (!('totalCount' in value) || value['totalCount'] === undefined) return false;
    if (!('data' in value) || value['data'] === undefined) return false;
    return true;
}

export function LabelRecordPagedResponseFromJSON(json: any): LabelRecordPagedResponse {
    return LabelRecordPagedResponseFromJSONTyped(json, false);
}

export function LabelRecordPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LabelRecordPagedResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'page': json['page'],
        'pageSize': json['pageSize'],
        'totalCount': json['totalCount'],
        'data': ((json['data'] as Array<any>).map(LabelRecordFromJSON)),
    };
}

export function LabelRecordPagedResponseToJSON(json: any): LabelRecordPagedResponse {
    return LabelRecordPagedResponseToJSONTyped(json, false);
}

export function LabelRecordPagedResponseToJSONTyped(value?: LabelRecordPagedResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'page': value['page'],
        'pageSize': value['pageSize'],
        'totalCount': value['totalCount'],
        'data': ((value['data'] as Array<any>).map(LabelRecordToJSON)),
    };
}

