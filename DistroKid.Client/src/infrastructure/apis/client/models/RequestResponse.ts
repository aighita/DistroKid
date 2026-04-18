













import { mapValues } from '../runtime';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface RequestResponse {
    




    readonly response?: string | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfRequestResponse(value: object): value is RequestResponse {
    return true;
}

export function RequestResponseFromJSON(json: any): RequestResponse {
    return RequestResponseFromJSONTyped(json, false);
}

export function RequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : json['response'],
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function RequestResponseToJSON(json: any): RequestResponse {
    return RequestResponseToJSONTyped(json, false);
}

export function RequestResponseToJSONTyped(value?: Omit<RequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}

