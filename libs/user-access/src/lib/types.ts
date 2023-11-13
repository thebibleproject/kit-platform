/**
 * Token obtained from a successful login
 */
export interface LoginResponse {
    accessToken: string;
}

/**
 * Error indicating user-supplied credentials are invalid
 */
export class InvalidLoginError {
    constructor(public message: string) {}
}
