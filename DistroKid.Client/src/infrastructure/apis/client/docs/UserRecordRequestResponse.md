
# UserRecordRequestResponse


## Properties

Name | Type
------------ | -------------
`response` | [UserRecord](UserRecord.md)
`errorMessage` | [ErrorMessage](ErrorMessage.md)

## Example

```typescript
import type { UserRecordRequestResponse } from ''
const example = {
  "response": null,
  "errorMessage": null,
} satisfies UserRecordRequestResponse

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as UserRecordRequestResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


