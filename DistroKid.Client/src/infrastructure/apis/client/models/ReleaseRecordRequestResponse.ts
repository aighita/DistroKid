













import { mapValues } from '../runtime';
import type { ReleaseRecord } from './ReleaseRecord';
import {
    ReleaseRecordFromJSON,
    ReleaseRecordFromJSONTyped,
    ReleaseRecordToJSON,
    ReleaseRecordToJSONTyped,
} from './ReleaseRecord';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface ReleaseRecordRequestResponse {
    




    readonly response?: ReleaseRecord | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfReleaseRecordRequestResponse(value: object): value is ReleaseRecordRequestResponse {
    return true;
}

export function ReleaseRecordRequestResponseFromJSON(json: any): ReleaseRecordRequestResponse {
    return ReleaseRecordRequestResponseFromJSONTyped(json, false);
}

export function ReleaseRecordRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReleaseRecordRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : ReleaseRecordFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function ReleaseRecordRequestResponseToJSON(json: any): ReleaseRecordRequestResponse {
    return ReleaseRecordRequestResponseToJSONTyped(json, false);
}

export function ReleaseRecordRequestResponseToJSONTyped(value?: Omit<ReleaseRecordRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}

