import * as jwt_decode from 'jwt-decode';

export class TokenDecode {
    static getDecodedAccessToken(): any {
        const token = window.sessionStorage.getItem('token');
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

}
