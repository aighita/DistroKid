
# LoginResponseRecord


## Properties

Name | Type
------------ | -------------
`token` | string
`user` | [UserRecord](UserRecord.md)

## Example

```typescript
import type { LoginResponseRecord } from ''
const example = {
  "token": null,
  "user": null,
} satisfies LoginResponseRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as LoginResponseRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


