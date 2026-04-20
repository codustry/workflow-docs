addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const urlObject = new URL(request.url);

    // Allow SSL verification challenges to pass through
    if (urlObject.pathname.startsWith("/.well-known/")) {
      return await fetch(request);
    }

    // Proxy /docs/* to Mintlify
    if (/^\/docs/.test(urlObject.pathname)) {
      const DOCS_URL = "codustry.mintlify.dev";
      const CUSTOM_URL = "workflow.codustry.com";

      let url = new URL(request.url);
      url.hostname = DOCS_URL;

      let proxyRequest = new Request(url, request);
      proxyRequest.headers.set("Host", DOCS_URL);
      proxyRequest.headers.set("X-Forwarded-Host", CUSTOM_URL);
      proxyRequest.headers.set("X-Forwarded-Proto", "https");
      proxyRequest.headers.set(
        "CF-Connecting-IP",
        request.headers.get("CF-Connecting-IP")
      );

      return await fetch(proxyRequest);
    }
  } catch (error) {
    return await fetch(request);
  }
}
