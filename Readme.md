# HTTP Target

This project implements a tiny HTTP server that accepts all requests and logs them to the console.  Both the port and response code are configurable.

## <a name="options"></a>Options

|Option|Description|Default|
|---|---|---|
|-p, --port|Specifies the listening port|4000|
|-c, --code|Specifies the HTTP code that will be returned to clients|200|

## <a name="running"></a>Running

```Javascript
npx http-target                           // Port 4000, HTTP Code 200
npx http-target --port 8080               // Port 8080, HTTP Code 200
npx http-target --code 404                // Port 4000, HTTP Code 404
npx http-target --port 8080 --code 500    // Port 8080, HTTP Code 500
```

## <a name="previous-users"></a>1.x Users
The 1.x branch is still available but will not be maintained.  It is highly recommended to update to 2.x.  Frankly, with the environment variables and unnamed options, 1.x was a hot mess that should have never existed.  This is what happens when you work too close to the problem.

## <a name="changelog"></a>Change History
|Version|Description|
|---|---|
|1.0.0|Initial Release|
|1.0.1|Added port argument
|1.0.2|Increased max request size to 100mb
|2.0.0|Refactor; Named options; Custom return codes
