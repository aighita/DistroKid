













import { mapValues } from '../runtime';
import type { UserFileRecordPagedResponse } from './UserFileRecordPagedResponse';
import {
    UserFileRecordPagedResponseFromJSON,
    UserFileRecordPagedResponseFromJSONTyped,
    UserFileRecordPagedResponseToJSON,
    UserFileRecordPagedResponseToJSONTyped,
} from './UserFileRecordPagedResponse';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface UserFileRecordPagedResponseRequestResponse {
    




    readonly response?: UserFileRecordPagedResponse | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfUserFileRecordPagedResponseRequestResponse(value: object): value is UserFileRecordPagedResponseRequestResponse {
    return true;
}

export function UserFileRecordPagedResponseRequestResponseFromJSON(json: any): UserFileRecordPagedResponseRequestResponse {
    return UserFileRecordPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function UserFileRecordPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserFileRecordPagedResponseRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : UserFileRecordPagedResponseFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function UserFileRecordPagedResponseRequestResponseToJSON(json: any): UserFileRecordPagedResponseRequestResponse {
    return UserFileRecordPagedResponseRequestResponseToJSONTyped(json, false);
}

export function UserFileRecordPagedResponseRequestResponseToJSONTyped(value?: Omit<UserFileRecordPagedResponseRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}

