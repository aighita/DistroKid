













import { mapValues } from '../runtime';
import type { ReleaseRecordPagedResponse } from './ReleaseRecordPagedResponse';
import {
    ReleaseRecordPagedResponseFromJSON,
    ReleaseRecordPagedResponseFromJSONTyped,
    ReleaseRecordPagedResponseToJSON,
    ReleaseRecordPagedResponseToJSONTyped,
} from './ReleaseRecordPagedResponse';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface ReleaseRecordPagedResponseRequestResponse {
    




    readonly response?: ReleaseRecordPagedResponse | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfReleaseRecordPagedResponseRequestResponse(value: object): value is ReleaseRecordPagedResponseRequestResponse {
    return true;
}

export function ReleaseRecordPagedResponseRequestResponseFromJSON(json: any): ReleaseRecordPagedResponseRequestResponse {
    return ReleaseRecordPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function ReleaseRecordPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReleaseRecordPagedResponseRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : ReleaseRecordPagedResponseFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function ReleaseRecordPagedResponseRequestResponseToJSON(json: any): ReleaseRecordPagedResponseRequestResponse {
    return ReleaseRecordPagedResponseRequestResponseToJSONTyped(json, false);
}

export function ReleaseRecordPagedResponseRequestResponseToJSONTyped(value?: Omit<ReleaseRecordPagedResponseRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}

