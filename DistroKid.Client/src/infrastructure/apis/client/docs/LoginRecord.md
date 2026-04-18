
# LoginRecord


## Properties

Name | Type
------------ | -------------
`email` | string
`password` | string

## Example

```typescript
import type { LoginRecord } from ''
const example = {
  "email": null,
  "password": null,
} satisfies LoginRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as LoginRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


