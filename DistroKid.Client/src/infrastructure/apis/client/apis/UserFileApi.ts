














import * as runtime from '../runtime';
import type {
  RequestResponse,
  UserFileRecordPagedResponseRequestResponse,
} from '../models/index';
import {
    RequestResponseFromJSON,
    RequestResponseToJSON,
    UserFileRecordPagedResponseRequestResponseFromJSON,
    UserFileRecordPagedResponseRequestResponseToJSON,
} from '../models/index';

export interface ApiUserFileAddPostRequest {
    file?: Blob;
    description?: string;
}

export interface ApiUserFileDownloadIdGetRequest {
    id: string;
}

export interface ApiUserFileGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}




export class UserFileApi extends runtime.BaseAPI {

    


    async apiUserFileAddPostRequestOpts(requestParameters: ApiUserFileAddPostRequest): Promise<runtime.RequestOpts> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("Bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters['file'] != null) {
            formParams.append('File', requestParameters['file'] as any);
        }

        if (requestParameters['description'] != null) {
            formParams.append('Description', requestParameters['description'] as any);
        }


        let urlPath = `/api/UserFile/Add`;

        return {
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        };
    }

    async apiUserFileAddPostRaw(requestParameters: ApiUserFileAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const requestOptions = await this.apiUserFileAddPostRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    async apiUserFileAddPost(requestParameters: ApiUserFileAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiUserFileAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiUserFileDownloadIdGetRequestOpts(requestParameters: ApiUserFileDownloadIdGetRequest): Promise<runtime.RequestOpts> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiUserFileDownloadIdGet().'
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

        let urlPath = `/api/UserFile/Download/{id}`;
        urlPath = urlPath.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id'])));

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiUserFileDownloadIdGetRaw(requestParameters: ApiUserFileDownloadIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Blob>> {
        const requestOptions = await this.apiUserFileDownloadIdGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.BlobApiResponse(response);
    }

    async apiUserFileDownloadIdGet(requestParameters: ApiUserFileDownloadIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Blob> {
        const response = await this.apiUserFileDownloadIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    async apiUserFileGetPageGetRequestOpts(requestParameters: ApiUserFileGetPageGetRequest): Promise<runtime.RequestOpts> {
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

        let urlPath = `/api/UserFile/GetPage`;

        return {
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        };
    }

    async apiUserFileGetPageGetRaw(requestParameters: ApiUserFileGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserFileRecordPagedResponseRequestResponse>> {
        const requestOptions = await this.apiUserFileGetPageGetRequestOpts(requestParameters);
        const response = await this.request(requestOptions, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFileRecordPagedResponseRequestResponseFromJSON(jsonValue));
    }

    async apiUserFileGetPageGet(requestParameters: ApiUserFileGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserFileRecordPagedResponseRequestResponse> {
        const response = await this.apiUserFileGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
