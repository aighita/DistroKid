


















export const UserRoleEnum = {
    Artist: 'Artist',
    Manager: 'Manager',
    Label: 'Label',
    Admin: 'Admin'
} as const;
export type UserRoleEnum = typeof UserRoleEnum[keyof typeof UserRoleEnum];


export function instanceOfUserRoleEnum(value: any): boolean {
    for (const key in UserRoleEnum) {
        if (Object.prototype.hasOwnProperty.call(UserRoleEnum, key)) {
            if (UserRoleEnum[key as keyof typeof UserRoleEnum] === value) {
                return true;
            }
        }
    }
    return false;
}

export function UserRoleEnumFromJSON(json: any): UserRoleEnum {
    return UserRoleEnumFromJSONTyped(json, false);
}

export function UserRoleEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRoleEnum {
    return json as UserRoleEnum;
}

export function UserRoleEnumToJSON(value?: UserRoleEnum | null): any {
    return value as any;
}

export function UserRoleEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): UserRoleEnum {
    return value as UserRoleEnum;
}

