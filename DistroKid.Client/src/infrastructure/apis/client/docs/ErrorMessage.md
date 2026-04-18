
# ErrorMessage


## Properties

Name | Type
------------ | -------------
`message` | string
`code` | [ErrorCodes](ErrorCodes.md)
`status` | [HttpStatusCode](HttpStatusCode.md)

## Example

```typescript
import type { ErrorMessage } from ''
const example = {
  "message": null,
  "code": null,
  "status": null,
} satisfies ErrorMessage

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as ErrorMessage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


