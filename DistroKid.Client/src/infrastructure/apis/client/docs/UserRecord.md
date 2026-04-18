
# UserRecord


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`email` | string
`role` | [UserRoleEnum](UserRoleEnum.md)

## Example

```typescript
import type { UserRecord } from ''
const example = {
  "id": null,
  "name": null,
  "email": null,
  "role": null,
} satisfies UserRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as UserRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


