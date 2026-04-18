
# UserUpdateRecord


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`password` | string

## Example

```typescript
import type { UserUpdateRecord } from ''
const example = {
  "id": null,
  "name": null,
  "password": null,
} satisfies UserUpdateRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as UserUpdateRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


