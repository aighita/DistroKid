


















export const ReleaseTypeEnum = {
    Single: 'Single',
    Ep: 'EP',
    Album: 'Album'
} as const;
export type ReleaseTypeEnum = typeof ReleaseTypeEnum[keyof typeof ReleaseTypeEnum];


export function instanceOfReleaseTypeEnum(value: any): boolean {
    for (const key in ReleaseTypeEnum) {
        if (Object.prototype.hasOwnProperty.call(ReleaseTypeEnum, key)) {
            if (ReleaseTypeEnum[key as keyof typeof ReleaseTypeEnum] === value) {
                return true;
            }
        }
    }
    return false;
}

export function ReleaseTypeEnumFromJSON(json: any): ReleaseTypeEnum {
    return ReleaseTypeEnumFromJSONTyped(json, false);
}

export function ReleaseTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReleaseTypeEnum {
    return json as ReleaseTypeEnum;
}

export function ReleaseTypeEnumToJSON(value?: ReleaseTypeEnum | null): any {
    return value as any;
}

export function ReleaseTypeEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): ReleaseTypeEnum {
    return value as ReleaseTypeEnum;
}

