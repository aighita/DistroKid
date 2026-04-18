
# PlatformAddRecord


## Properties

Name | Type
------------ | -------------
`name` | string
`url` | string

## Example

```typescript
import type { PlatformAddRecord } from ''
const example = {
  "name": null,
  "url": null,
} satisfies PlatformAddRecord

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as PlatformAddRecord
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


