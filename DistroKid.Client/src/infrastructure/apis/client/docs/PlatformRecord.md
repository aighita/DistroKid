
# PlatformRecord


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`url` | string

## Example

```typescript
import type { PlatformRecord } from ''
const example = {
  "id": null,
  "name": null,
  "url": null,
} satisfies PlatformRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as PlatformRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


