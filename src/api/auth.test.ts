import { describe, it, expect } from "vitest";
import { getAPIKey } from "./auth";

describe("getAPIKey", () => {
  it("returns null when authorization header is missing", () => {
    expect(getAPIKey({} as any)).toBeNull();
  });

  it("returns null for wrong scheme", () => {
    expect(getAPIKey({ authorization: "Bearer token" } as any)).toBeNull();
  });

  it("returns null when malformed header has no space", () => {
    expect(getAPIKey({ authorization: "ApiKeyabc" } as any)).toBeNull();
  });

  it("returns the api key when header is valid", () => {
    expect(getAPIKey({ authorization: "ApiKey my-secret" } as any)).toEqual(
      "my-secret",
    );
  });

  it("is case-sensitive for the scheme", () => {
    expect(getAPIKey({ authorization: "apikey my-secret" } as any)).toBeNull();
  });
});
