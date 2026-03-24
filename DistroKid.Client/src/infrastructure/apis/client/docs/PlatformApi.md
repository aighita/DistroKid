# PlatformApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiPlatformAddPost**](PlatformApi.md#apiplatformaddpost) | **POST** /api/Platform/Add |  |
| [**apiPlatformDeleteIdDelete**](PlatformApi.md#apiplatformdeleteiddelete) | **DELETE** /api/Platform/Delete/{id} |  |
| [**apiPlatformGetAllGet**](PlatformApi.md#apiplatformgetallget) | **GET** /api/Platform/GetAll |  |
| [**apiPlatformGetByIdIdGet**](PlatformApi.md#apiplatformgetbyididget) | **GET** /api/Platform/GetById/{id} |  |
| [**apiPlatformUpdateIdPut**](PlatformApi.md#apiplatformupdateidput) | **PUT** /api/Platform/Update/{id} |  |



## apiPlatformAddPost

> RequestResponse apiPlatformAddPost(platformAddRecord)



### Example

```ts
import {
  Configuration,
  PlatformApi,
} from '';
import type { ApiPlatformAddPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PlatformApi(config);

  const body = {
    // PlatformAddRecord (optional)
    platformAddRecord: ...,
  } satisfies ApiPlatformAddPostRequest;

  try {
    const data = await api.apiPlatformAddPost(body);
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
| **platformAddRecord** | [PlatformAddRecord](PlatformAddRecord.md) |  | [Optional] |

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


## apiPlatformDeleteIdDelete

> RequestResponse apiPlatformDeleteIdDelete(id)



### Example

```ts
import {
  Configuration,
  PlatformApi,
} from '';
import type { ApiPlatformDeleteIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PlatformApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiPlatformDeleteIdDeleteRequest;

  try {
    const data = await api.apiPlatformDeleteIdDelete(body);
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


## apiPlatformGetAllGet

> PlatformRecordListRequestResponse apiPlatformGetAllGet()



### Example

```ts
import {
  Configuration,
  PlatformApi,
} from '';
import type { ApiPlatformGetAllGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PlatformApi(config);

  try {
    const data = await api.apiPlatformGetAllGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
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


## apiPlatformGetByIdIdGet

> PlatformRecordRequestResponse apiPlatformGetByIdIdGet(id)



### Example

```ts
import {
  Configuration,
  PlatformApi,
} from '';
import type { ApiPlatformGetByIdIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PlatformApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiPlatformGetByIdIdGetRequest;

  try {
    const data = await api.apiPlatformGetByIdIdGet(body);
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

[**PlatformRecordRequestResponse**](PlatformRecordRequestResponse.md)

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


## apiPlatformUpdateIdPut

> RequestResponse apiPlatformUpdateIdPut(id, platformUpdateRecord)



### Example

```ts
import {
  Configuration,
  PlatformApi,
} from '';
import type { ApiPlatformUpdateIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PlatformApi(config);

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // PlatformUpdateRecord (optional)
    platformUpdateRecord: ...,
  } satisfies ApiPlatformUpdateIdPutRequest;

  try {
    const data = await api.apiPlatformUpdateIdPut(body);
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
| **platformUpdateRecord** | [PlatformUpdateRecord](PlatformUpdateRecord.md) |  | [Optional] |

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

