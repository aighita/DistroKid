
# EventUpdateRecord


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`location` | string
`date` | Date

## Example

```typescript
import type { EventUpdateRecord } from ''
const example = {
  "name": null,
  "description": null,
  "location": null,
  "date": null,
} satisfies EventUpdateRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as EventUpdateRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


