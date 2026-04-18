













import { mapValues } from '../runtime';
import type { UserRecord } from './UserRecord';
import {
    UserRecordFromJSON,
    UserRecordFromJSONTyped,
    UserRecordToJSON,
    UserRecordToJSONTyped,
} from './UserRecord';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface UserRecordRequestResponse {
    




    readonly response?: UserRecord | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfUserRecordRequestResponse(value: object): value is UserRecordRequestResponse {
    return true;
}

export function UserRecordRequestResponseFromJSON(json: any): UserRecordRequestResponse {
    return UserRecordRequestResponseFromJSONTyped(json, false);
}

export function UserRecordRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRecordRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : UserRecordFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function UserRecordRequestResponseToJSON(json: any): UserRecordRequestResponse {
    return UserRecordRequestResponseToJSONTyped(json, false);
}

export function UserRecordRequestResponseToJSONTyped(value?: Omit<UserRecordRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}

