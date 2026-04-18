# UserApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiUserAddPost**](UserApi.md#apiuseraddpost) | **POST** /api/User/Add |  |
| [**apiUserDeleteIdDelete**](UserApi.md#apiuserdeleteiddelete) | **DELETE** /api/User/Delete/{id} |  |
| [**apiUserGetByIdIdGet**](UserApi.md#apiusergetbyididget) | **GET** /api/User/GetById/{id} |  |
| [**apiUserGetPageGet**](UserApi.md#apiusergetpageget) | **GET** /api/User/GetPage |  |
| [**apiUserGetUserPlatformsGet**](UserApi.md#apiusergetuserplatformsget) | **GET** /api/User/GetUserPlatforms |  |
| [**apiUserUpdatePut**](UserApi.md#apiuserupdateput) | **PUT** /api/User/Update |  |



## apiUserAddPost

> RequestResponse apiUserAddPost(userAddRecord)



### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { ApiUserAddPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  const body = {
    userAddRecord: ...,
  } satisfies ApiUserAddPostRequest;

  try {
    const data = await api.apiUserAddPost(body);
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
| **userAddRecord** | [UserAddRecord](UserAddRecord.md) |  | [Optional] |

### Return type

[**RequestResponse**](RequestResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUserDeleteIdDelete

> RequestResponse apiUserDeleteIdDelete(id)



### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { ApiUserDeleteIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  const body = {
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiUserDeleteIdDeleteRequest;

  try {
    const data = await api.apiUserDeleteIdDelete(body);
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

[**RequestResponse**](RequestResponse.md)

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


## apiUserGetByIdIdGet

> UserRecordRequestResponse apiUserGetByIdIdGet(id)



### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { ApiUserGetByIdIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  const body = {
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiUserGetByIdIdGetRequest;

  try {
    const data = await api.apiUserGetByIdIdGet(body);
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

[**UserRecordRequestResponse**](UserRecordRequestResponse.md)

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


## apiUserGetPageGet

> UserRecordPagedResponseRequestResponse apiUserGetPageGet(search, page, pageSize)



### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { ApiUserGetPageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  const body = {
    search: search_example,
    page: 56,
    pageSize: 56,
  } satisfies ApiUserGetPageGetRequest;

  try {
    const data = await api.apiUserGetPageGet(body);
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

[**UserRecordPagedResponseRequestResponse**](UserRecordPagedResponseRequestResponse.md)

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


## apiUserGetUserPlatformsGet

> PlatformRecordListRequestResponse apiUserGetUserPlatformsGet()



### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { ApiUserGetUserPlatformsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  try {
    const data = await api.apiUserGetUserPlatformsGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**PlatformRecordListRequestResponse**](PlatformRecordListRequestResponse.md)

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


## apiUserUpdatePut

> RequestResponse apiUserUpdatePut(userUpdateRecord)



### Example

```ts
import {
  Configuration,
  UserApi,
} from '';
import type { ApiUserUpdatePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UserApi(config);

  const body = {
    userUpdateRecord: ...,
  } satisfies ApiUserUpdatePutRequest;

  try {
    const data = await api.apiUserUpdatePut(body);
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
| **userUpdateRecord** | [UserUpdateRecord](UserUpdateRecord.md) |  | [Optional] |

### Return type

[**RequestResponse**](RequestResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

