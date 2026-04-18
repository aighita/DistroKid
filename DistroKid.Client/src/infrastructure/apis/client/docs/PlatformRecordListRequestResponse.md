
# PlatformRecordListRequestResponse


## Properties

Name | Type
------------ | -------------
`response` | [Array&lt;PlatformRecord&gt;](PlatformRecord.md)
`errorMessage` | [ErrorMessage](ErrorMessage.md)

## Example

```typescript
import type { PlatformRecordListRequestResponse } from ''
const example = {
  "response": null,
  "errorMessage": null,
} satisfies PlatformRecordListRequestResponse

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as PlatformRecordListRequestResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


