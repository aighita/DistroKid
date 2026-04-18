
# UserAddRecord


## Properties

Name | Type
------------ | -------------
`name` | string
`email` | string
`password` | string
`role` | [UserRoleEnum](UserRoleEnum.md)

## Example

```typescript
import type { UserAddRecord } from ''
const example = {
  "name": null,
  "email": null,
  "password": null,
  "role": null,
} satisfies UserAddRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as UserAddRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


