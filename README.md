# Lamda Kit

Utility functions that makes lambda development a bit easier

## API Reference

- ok

Shortcut for `callback(null, { statusCode: 200, body: JSON.stringify(responseValue) })`


Usage: ok(callback, response)

```
import { ok } from '@sophon-lab/lambda-kit';

// response can be an object, which will be serialized to JSON
ok(callback, { 
  todos: [ 
    { content: 'Return book' },
    { content: 'File tax return' }
  ] 
})

// response can be a string
ok(callback, 'Operation done')
```

- serverError

Usage: serverError(callback, error)

```
import { serverError } from '@sophon-lab/lambda-kit';

// error can be an Error object
serverError(callback, new Error('DB connection timeout'))

// error can be a string
serverError(callback, 'DB connection timeout')
```

- unauthorizedRequest

Usage: unauthorizedRequest(callback, message)

```
import { unauthorizedRequest } from '@sophon-lab/lambda-kit';

// message is optional
unauthorizedRequest(callback)

// message can be a custom message
unauthorizedRequest(callback, 'Please login')
```

- unprocessableEntity

Usage: unprocessableEntity(callback, message)

```
import { unprocessableEntity } from '@sophon-lab/lambda-kit';

// message is optional
unprocessableEntity(callback)

// message can be a custom message
unprocessableEntity(callback, 'Duplicate user')
```

- withIdentity

Wrap the lambda handler with tedious handling for "Unauthorized Requests"

Usage: withIdentity(handler)

```
import { withIdentity } from '@sophon-lab/lambda-kit';

withIdentity((event, context, callback) => {
  ok(callback, 'Great, current request have valid identity');
})
```

- getAuthContext

Get value from auth context.

Usage: getAuthContext(event, key)

```
import { getAuthContext } from '@sophon-lab/lambda-kit';

getAuthContext(event, 'sub')
getAuthContext(event, 'email')
```
