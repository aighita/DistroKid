














import * as runtime from '../runtime';
import type {
  PlatformRecordListRequestResponse,
  RequestResponse,
  UserAddRecord,
  UserRecordPagedResponseRequestResponse,
  UserRecordRequestResponse,
  UserUpdateRecord,
} from '../models/index';
import {
    PlatformRecordListRequestResponseFromJSON,
    PlatformRecordListRequestResponseToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
    UserAddRecordFromJSON,
    UserAddRecordToJSON,
    UserRecordPagedResponseRequestResponseFromJSON,
    UserRecordPagedResponseRequestResponseToJSON,
    UserRecordRequestResponseFromJSON,
    UserRecordRequestResponseToJSON,
    UserUpdateRecordFromJSON,
    UserUpdateRecordToJSON,
} from '../models/index';

export interface ApiUserAddPostRequest {
    userAddRecord?: UserAddRecord;
}

export interface ApiUserDeleteIdDeleteRequest {
    id: string;
}

export interface ApiUserGetByIdIdGetRequest {
    id: string;
}

export interface ApiUserGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiUserUpdatePutRequest {
    userUpdateRecord?: UserUpdateRecord;
}




export class UserApi extends runtime.BaseAPI {

    


    async apiUserAddPostRequestOpts(requestParameters: ApiUserAddPostRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/User/Add`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserAddRecordToJSON(requestParameters['userAddRecord']),
        };
    }

    async apiUserAddPostRaw(requestParameters: ApiUserAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiUserAddPostRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiUserAddPost(requestParameters: ApiUserAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiUserAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiUserDeleteIdDeleteRequestOpts(requestParameters: ApiUserDeleteIdDeleteRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiUserDeleteIdDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/User/Delete/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiUserDeleteIdDeleteRaw(requestParameters: ApiUserDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiUserDeleteIdDeleteRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiUserDeleteIdDelete(requestParameters: ApiUserDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiUserDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiUserGetByIdIdGetRequestOpts(requestParameters: ApiUserGetByIdIdGetRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiUserGetByIdIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/User/GetById/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiUserGetByIdIdGetRaw(requestParameters: ApiUserGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserRecordRequestResponse>> {
        const requestOptions = await this.apiUserGetByIdIdGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserRecordRequestResponseFromJSON(jsonValue));
    }

    async apiUserGetByIdIdGet(requestParameters: ApiUserGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserRecordRequestResponse> {
        const response = await this.apiUserGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiUserGetPageGetRequestOpts(requestParameters: ApiUserGetPageGetRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        if (requestParameters['search'] != null) {
            queryParameters['Search'] = requestParameters['search'];
        }

        if (requestParameters['page'] != null) {
            queryParameters['Page'] = requestParameters['page'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['PageSize'] = requestParameters['pageSize'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/User/GetPage`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiUserGetPageGetRaw(requestParameters: ApiUserGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserRecordPagedResponseRequestResponse>> {
        const requestOptions = await this.apiUserGetPageGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserRecordPagedResponseRequestResponseFromJSON(jsonValue));
    }

    async apiUserGetPageGet(requestParameters: ApiUserGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserRecordPagedResponseRequestResponse> {
        const response = await this.apiUserGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiUserGetUserPlatformsGetRequestOpts(): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/User/GetUserPlatforms`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiUserGetUserPlatformsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlatformRecordListRequestResponse>> {
        const requestOptions = await this.apiUserGetUserPlatformsGetRequestOpts();
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlatformRecordListRequestResponseFromJSON(jsonValue));
    }

    async apiUserGetUserPlatformsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlatformRecordListRequestResponse> {
        const response = await this.apiUserGetUserPlatformsGetRaw(initOverrides);
        return await response.value();
    }

    async apiUserUpdatePutRequestOpts(requestParameters: ApiUserUpdatePutRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }

        let urlPath = `/api/User/Update`;

        return {
            path: urlPath,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UserUpdateRecordToJSON(requestParameters['userUpdateRecord']),
        };
    }

    async apiUserUpdatePutRaw(requestParameters: ApiUserUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiUserUpdatePutRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiUserUpdatePut(requestParameters: ApiUserUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiUserUpdatePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
