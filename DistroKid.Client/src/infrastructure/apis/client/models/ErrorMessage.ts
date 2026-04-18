













import { mapValues } from '../runtime';
import type { ErrorCodes } from './ErrorCodes';
import {
    ErrorCodesFromJSON,
    ErrorCodesFromJSONTyped,
    ErrorCodesToJSON,
    ErrorCodesToJSONTyped,
} from './ErrorCodes';
import type { HttpStatusCode } from './HttpStatusCode';
import {
    HttpStatusCodeFromJSON,
    HttpStatusCodeFromJSONTyped,
    HttpStatusCodeToJSON,
    HttpStatusCodeToJSONTyped,
} from './HttpStatusCode';






export interface ErrorMessage {
    




    message: string;
    




    code: ErrorCodes;
    




    status: HttpStatusCode;
}






export function instanceOfErrorMessage(value: object): value is ErrorMessage {
    if (!('message' in value) || value['message'] === undefined) return false;
    if (!('code' in value) || value['code'] === undefined) return false;
    if (!('status' in value) || value['status'] === undefined) return false;
    return true;
}

export function ErrorMessageFromJSON(json: any): ErrorMessage {
    return ErrorMessageFromJSONTyped(json, false);
}

export function ErrorMessageFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorMessage {
    if (json == null) {
        return json;
    }
    return {
        
        'message': json['message'],
        'code': ErrorCodesFromJSON(json['code']),
        'status': HttpStatusCodeFromJSON(json['status']),
    };
}

export function ErrorMessageToJSON(json: any): ErrorMessage {
    return ErrorMessageToJSONTyped(json, false);
}

export function ErrorMessageToJSONTyped(value?: ErrorMessage | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'message': value['message'],
        'code': ErrorCodesToJSON(value['code']),
        'status': HttpStatusCodeToJSON(value['status']),
    };
}

