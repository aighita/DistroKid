













import { mapValues } from '../runtime';
import type { UserRecordPagedResponse } from './UserRecordPagedResponse';
import {
    UserRecordPagedResponseFromJSON,
    UserRecordPagedResponseFromJSONTyped,
    UserRecordPagedResponseToJSON,
    UserRecordPagedResponseToJSONTyped,
} from './UserRecordPagedResponse';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface UserRecordPagedResponseRequestResponse {
    




    readonly response?: UserRecordPagedResponse | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfUserRecordPagedResponseRequestResponse(value: object): value is UserRecordPagedResponseRequestResponse {
    return true;
}

export function UserRecordPagedResponseRequestResponseFromJSON(json: any): UserRecordPagedResponseRequestResponse {
    return UserRecordPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function UserRecordPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRecordPagedResponseRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : UserRecordPagedResponseFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function UserRecordPagedResponseRequestResponseToJSON(json: any): UserRecordPagedResponseRequestResponse {
    return UserRecordPagedResponseRequestResponseToJSONTyped(json, false);
}

export function UserRecordPagedResponseRequestResponseToJSONTyped(value?: Omit<UserRecordPagedResponseRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}

