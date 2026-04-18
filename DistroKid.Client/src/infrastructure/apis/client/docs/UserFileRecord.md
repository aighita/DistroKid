
# UserFileRecord


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`description` | string
`user` | [UserRecord](UserRecord.md)
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { UserFileRecord } from ''
const example = {
  "id": null,
  "name": null,
  "description": null,
  "user": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies UserFileRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as UserFileRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


