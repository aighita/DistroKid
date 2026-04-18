
# EventRecord


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`description` | string
`location` | string
`date` | Date
`artist` | [UserRecord](UserRecord.md)

## Example

```typescript
import type { EventRecord } from ''
const example = {
  "id": null,
  "name": null,
  "description": null,
  "location": null,
  "date": null,
  "artist": null,
} satisfies EventRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as EventRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


