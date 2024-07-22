/* The `export interface AuthResponse` in the TypeScript code snippet is defining a TypeScript
interface named `AuthResponse`. This interface specifies the structure of objects that are expected
to have optional properties `message` of type string and `token` of type string. By using the
`export` keyword, this interface can be accessed and used in other parts of the codebase or by other
modules that import it. */
export interface AuthResponse {
  message?: string;
  token?: string;
}
/* The `export interface User` in the TypeScript code snippet is defining a TypeScript interface named
`User`. This interface specifies the structure of objects that are expected to have a `username`
property of type string and an optional `email` property of type string. */
export interface User {
  id?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  phoneNumber?: string;
}
/* The `export interface JwtToken` in the TypeScript code snippet is defining a TypeScript interface
named `JwtToken`. This interface specifies the structure of objects that are expected to have
properties like `iss`, `sub`, `exp`, `iat`, and `scope`, all of which are optional properties. */
export interface JwtToken {
  iss?: string;
  sub?: string;
  exp?: number;
  iat?: number;
  scope?: string;
}
