
# EventRecordRequestResponse


## Properties

Name | Type
------------ | -------------
`response` | [EventRecord](EventRecord.md)
`errorMessage` | [ErrorMessage](ErrorMessage.md)

## Example

```typescript
import type { EventRecordRequestResponse } from ''
const example = {
  "response": null,
  "errorMessage": null,
} satisfies EventRecordRequestResponse

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as EventRecordRequestResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


