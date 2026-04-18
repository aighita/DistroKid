
# ErrorCodes


## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { ErrorCodes } from ''
const example = {
} satisfies ErrorCodes

console.log(example)
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)
const exampleParsed = JSON.parse(exampleJSON) as ErrorCodes
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


