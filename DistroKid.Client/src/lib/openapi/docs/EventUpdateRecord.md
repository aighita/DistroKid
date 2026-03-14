
# EventUpdateRecord


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`location` | string
`date` | Date
`artist` | [UserRecord](UserRecord.md)

## Example

```typescript
import type { EventUpdateRecord } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "description": null,
  "location": null,
  "date": null,
  "artist": null,
} satisfies EventUpdateRecord

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EventUpdateRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


