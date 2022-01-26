# HTTP Target

This project implements a tiny HTTP server that accepts all requests and logs them to the console.  A 200 is returned to the client.

## <a name="api"></a>Environment Variables
The following environment variables are supported:

Method | Path | Description
--- | --- | ---
PORT | 4000 | The port to listen on

Specifying a port when running http-target will override an environment variable or default.

## <a name="running"></a>Running

```
npx http-target [port]