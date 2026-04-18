













import { mapValues } from '../runtime';
import type { PlatformRecord } from './PlatformRecord';
import {
    PlatformRecordFromJSON,
    PlatformRecordFromJSONTyped,
    PlatformRecordToJSON,
    PlatformRecordToJSONTyped,
} from './PlatformRecord';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface PlatformRecordListRequestResponse {
    




    readonly response?: Array<PlatformRecord> | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfPlatformRecordListRequestResponse(value: object): value is PlatformRecordListRequestResponse {
    return true;
}

export function PlatformRecordListRequestResponseFromJSON(json: any): PlatformRecordListRequestResponse {
    return PlatformRecordListRequestResponseFromJSONTyped(json, false);
}

export function PlatformRecordListRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlatformRecordListRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : ((json['response'] as Array<any>).map(PlatformRecordFromJSON)),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function PlatformRecordListRequestResponseToJSON(json: any): PlatformRecordListRequestResponse {
    return PlatformRecordListRequestResponseToJSONTyped(json, false);
}

export function PlatformRecordListRequestResponseToJSONTyped(value?: Omit<PlatformRecordListRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}

