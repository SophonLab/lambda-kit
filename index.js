function stringify(body) {
  if (typeof body === "string" || body instanceof String) {
    return body;
  } else {
    return JSON.stringify(body);
  }
}

function respond(callback, code, body) {
  return callback(null, {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: stringify(body)
  });
}

function unauthorizedRequest(callback, message = "Unauthorized Request") {
  return respond(callback, 401, { message: message });
}

function serverError(callback, error) {
  return respond(callback, 500, { message: error.message || error });
}

function unprocessableEntity(callback, message = "Unprocessable Entity") {
  return respond(callback, 422, { message: message });
}

function ok(callback, response) {
  return respond(callback, 200, response);
}

function withIdentity(handler) {
  return (event, context, callback) => {
    if (event.requestContext && event.requestContext.authorizer) {
      handler(event, context, callback);
    } else {
      unauthorizedRequest(callback);
    }
  };
}

function getAuthContext(event, key) {
  return event.requestContext.authorizer[key];
}

module.exports = {
  unprocessableEntity: unprocessableEntity,
  unauthorizedRequest: unauthorizedRequest,
  serverError: serverError,
  ok: ok,
  withIdentity: withIdentity,
  getAuthContext: getAuthContext
};
