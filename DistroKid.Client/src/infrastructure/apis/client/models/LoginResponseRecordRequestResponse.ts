













import { mapValues } from '../runtime';
import type { LoginResponseRecord } from './LoginResponseRecord';
import {
    LoginResponseRecordFromJSON,
    LoginResponseRecordFromJSONTyped,
    LoginResponseRecordToJSON,
    LoginResponseRecordToJSONTyped,
} from './LoginResponseRecord';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';






export interface LoginResponseRecordRequestResponse {
    




    readonly response?: LoginResponseRecord | null;
    




    readonly errorMessage?: ErrorMessage | null;
}




export function instanceOfLoginResponseRecordRequestResponse(value: object): value is LoginResponseRecordRequestResponse {
    return true;
}

export function LoginResponseRecordRequestResponseFromJSON(json: any): LoginResponseRecordRequestResponse {
    return LoginResponseRecordRequestResponseFromJSONTyped(json, false);
}

export function LoginResponseRecordRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginResponseRecordRequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : LoginResponseRecordFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function LoginResponseRecordRequestResponseToJSON(json: any): LoginResponseRecordRequestResponse {
    return LoginResponseRecordRequestResponseToJSONTyped(json, false);
}

export function LoginResponseRecordRequestResponseToJSONTyped(value?: Omit<LoginResponseRecordRequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}

