# UserFileApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiUserFileAddPost**](UserFileApi.md#apiuserfileaddpost) | **POST** /api/UserFile/Add |  |
| [**apiUserFileDownloadIdGet**](UserFileApi.md#apiuserfiledownloadidget) | **GET** /api/UserFile/Download/{id} |  |
| [**apiUserFileGetPageGet**](UserFileApi.md#apiuserfilegetpageget) | **GET** /api/UserFile/GetPage |  |



## apiUserFileAddPost

> RequestResponse apiUserFileAddPost(file, description)



### Example

```ts
import {
  Configuration,
  UserFileApi,
} from '';
import type { ApiUserFileAddPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserFileApi(config);

  const body = {
    file: BINARY_DATA_HERE,
    description: description_example,
  } satisfies ApiUserFileAddPostRequest;

  try {
    const data = await api.apiUserFileAddPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **file** | `Blob` |  | [Optional] [Defaults to `undefined`] |
| **description** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**RequestResponse**](RequestResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUserFileDownloadIdGet

> Blob apiUserFileDownloadIdGet(id)



### Example

```ts
import {
  Configuration,
  UserFileApi,
} from '';
import type { ApiUserFileDownloadIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserFileApi(config);

  const body = {
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiUserFileDownloadIdGetRequest;

  try {
    const data = await api.apiUserFileDownloadIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type


### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/octet-stream`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUserFileGetPageGet

> UserFileRecordPagedResponseRequestResponse apiUserFileGetPageGet(search, page, pageSize)



### Example

```ts
import {
  Configuration,
  UserFileApi,
} from '';
import type { ApiUserFileGetPageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserFileApi(config);

  const body = {
    search: search_example,
    page: 56,
    pageSize: 56,
  } satisfies ApiUserFileGetPageGetRequest;

  try {
    const data = await api.apiUserFileGetPageGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**UserFileRecordPagedResponseRequestResponse**](UserFileRecordPagedResponseRequestResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

