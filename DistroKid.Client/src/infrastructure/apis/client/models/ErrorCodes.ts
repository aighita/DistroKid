


















export const ErrorCodes = {
    Unknown: 'Unknown',
    TechnicalError: 'TechnicalError',
    EntityNotFound: 'EntityNotFound',
    PhysicalFileNotFound: 'PhysicalFileNotFound',
    UserAlreadyExists: 'UserAlreadyExists',
    WrongPassword: 'WrongPassword',
    CannotAdd: 'CannotAdd',
    CannotUpdate: 'CannotUpdate',
    CannotDelete: 'CannotDelete',
    MailSendFailed: 'MailSendFailed',
    UserNotArtist: 'UserNotArtist'
} as const;
export type ErrorCodes = typeof ErrorCodes[keyof typeof ErrorCodes];


export function instanceOfErrorCodes(value: any): boolean {
    for (const key in ErrorCodes) {
        if (Object.prototype.hasOwnProperty.call(ErrorCodes, key)) {
            if (ErrorCodes[key as keyof typeof ErrorCodes] === value) {
                return true;
            }
        }
    }
    return false;
}

export function ErrorCodesFromJSON(json: any): ErrorCodes {
    return ErrorCodesFromJSONTyped(json, false);
}

export function ErrorCodesFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorCodes {
    return json as ErrorCodes;
}

export function ErrorCodesToJSON(value?: ErrorCodes | null): any {
    return value as any;
}

export function ErrorCodesToJSONTyped(value: any, ignoreDiscriminator: boolean): ErrorCodes {
    return value as ErrorCodes;
}

