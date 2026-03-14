# ReleaseApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiReleaseAddPost**](ReleaseApi.md#apireleaseaddpost) | **POST** /api/Release/Add |  |
| [**apiReleaseDeleteIdDelete**](ReleaseApi.md#apireleasedeleteiddelete) | **DELETE** /api/Release/Delete/{id} |  |
| [**apiReleaseGetByIdIdGet**](ReleaseApi.md#apireleasegetbyididget) | **GET** /api/Release/GetById/{id} |  |
| [**apiReleaseUpdateIdPut**](ReleaseApi.md#apireleaseupdateidput) | **PUT** /api/Release/Update/{id} |  |



## apiReleaseAddPost

> RequestResponse apiReleaseAddPost(releaseAddRecord)



### Example

```ts
import {
  Configuration,
  ReleaseApi,
} from '';
import type { ApiReleaseAddPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReleaseApi(config);

  const body = {
    // ReleaseAddRecord (optional)
    releaseAddRecord: ...,
  } satisfies ApiReleaseAddPostRequest;

  try {
    const data = await api.apiReleaseAddPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **releaseAddRecord** | [ReleaseAddRecord](ReleaseAddRecord.md) |  | [Optional] |

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


## apiReleaseDeleteIdDelete

> RequestResponse apiReleaseDeleteIdDelete(id)



### Example

```ts
import {
  Configuration,
  ReleaseApi,
} from '';
import type { ApiReleaseDeleteIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReleaseApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiReleaseDeleteIdDeleteRequest;

  try {
    const data = await api.apiReleaseDeleteIdDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
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


## apiReleaseGetByIdIdGet

> ReleaseRecordRequestResponse apiReleaseGetByIdIdGet(id)



### Example

```ts
import {
  Configuration,
  ReleaseApi,
} from '';
import type { ApiReleaseGetByIdIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReleaseApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiReleaseGetByIdIdGetRequest;

  try {
    const data = await api.apiReleaseGetByIdIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ReleaseRecordRequestResponse**](ReleaseRecordRequestResponse.md)

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


## apiReleaseUpdateIdPut

> RequestResponse apiReleaseUpdateIdPut(id, releaseUpdateRecord)



### Example

```ts
import {
  Configuration,
  ReleaseApi,
} from '';
import type { ApiReleaseUpdateIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReleaseApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // ReleaseUpdateRecord (optional)
    releaseUpdateRecord: ...,
  } satisfies ApiReleaseUpdateIdPutRequest;

  try {
    const data = await api.apiReleaseUpdateIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **releaseUpdateRecord** | [ReleaseUpdateRecord](ReleaseUpdateRecord.md) |  | [Optional] |

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

