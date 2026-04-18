
# RegisterRecord


## Properties

Name | Type
------------ | -------------
`name` | string
`email` | string
`password` | string
`confirmPassword` | string
`role` | [UserRoleEnum](UserRoleEnum.md)
`bio` | string
`socialMediaLink` | string

## Example

```typescript
import type { RegisterRecord } from ''
const example = {
  "name": null,
  "email": null,
  "password": null,
  "confirmPassword": null,
  "role": null,
  "bio": null,
  "socialMediaLink": null,
} satisfies RegisterRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as RegisterRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


