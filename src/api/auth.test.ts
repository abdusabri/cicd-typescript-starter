import { describe, it, expect } from "vitest";
import { getAPIKey } from "./auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  it("returns null when authorization header is missing", () => {
    expect(getAPIKey({} as IncomingHttpHeaders)).toBeNull();
  });

  it("returns null for wrong scheme", () => {
    expect(
      getAPIKey({ authorization: "Bearer token" } as IncomingHttpHeaders),
    ).toBeNull();
  });

  it("returns null when malformed header has no space", () => {
    expect(
      getAPIKey({ authorization: "ApiKeyabc" } as IncomingHttpHeaders),
    ).toBeNull();
  });

  it("returns the api key when header is valid", () => {
    expect(
      getAPIKey({ authorization: "ApiKey my-secret" } as IncomingHttpHeaders),
    ).toEqual("my-secret");
  });

  it("is case-sensitive for the scheme", () => {
    expect(
      getAPIKey({ authorization: "apikey my-secret" } as IncomingHttpHeaders),
    ).toBeNull();
  });
});
