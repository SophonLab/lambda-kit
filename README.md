# Lamda Kit

A few utility functions that makes lambda development a little bit easier

## Doc

- ok

Shortcut for `callback(null, { statusCode: 200, body: JSON.stringify(responseValue) })`


Usage: ok(callback, response)

```
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
// error can be an Error object
serverError(callback, new Error('DB connection timeout'))

// error can be a string
serverError(callback, 'DB connection timeout')
```

- unauthorizedRequest

Usage: unauthorizedRequest(callback, message)

```
// message is optional
unauthorizedRequest(callback)

// message can be a custom message
unauthorizedRequest(callback, 'Please login')
```

- withIdentity

Wrap the lambda handler with tedious handling for "Unauthorized Requests"

Usage: withIdentity(handler)

```
withIdentity((event, context, callback) => {
  ok(callback, 'Great, current request have valid identity');
})
```

- getAuthContext

Get value from auth context.

Usage: getAuthContext(event, key)

```
getAuthContext(event, 'sub')
getAuthContext(event, 'email')
```
