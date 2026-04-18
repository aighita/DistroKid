













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






export interface PlatformRecordRequestResponse {
    




    readonly response?: PlatformRecord | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfPlatformRecordRequestResponse(value: object): value is PlatformRecordRequestResponse {
    return true;
}

export function PlatformRecordRequestResponseFromJSON(json: any): PlatformRecordRequestResponse {
    return PlatformRecordRequestResponseFromJSONTyped(json, false);
}

export function PlatformRecordRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlatformRecordRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : PlatformRecordFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function PlatformRecordRequestResponseToJSON(json: any): PlatformRecordRequestResponse {
    return PlatformRecordRequestResponseToJSONTyped(json, false);
}

export function PlatformRecordRequestResponseToJSONTyped(value?: Omit<PlatformRecordRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}

