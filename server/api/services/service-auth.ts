/**
 * @ Author: Tim Koepsel
 * @ Create Time: 09.06.2020 12:58:22
 * @ Modified by: Tim Koepsel
 * @ Modified time: 10.06.2020 14:39:14
 * @ Description:
 */


 import { ExpressJwtFusionAuth }  from 'express-jwt-fusionauth';
 import * as config from '../cfg/config.json';


/**
 * Auth Service
 * provides Authentication
 * provides Authorisation
 *
 * @export
 * @class AuthService
 */
export class AuthService {
     _auth: ExpressJwtFusionAuth;
     _jwt_issuer: string;
     _oauth_clientid: string;
     _oauth_clientsecret: string;
     _oauth_redirect_url: string;
     _oauth_cookiedomain: string;

     constructor(jwt_issuer: string, oauth_clientid: string, oauth_clientsecret: string, oauth_redirect_url: string, oauth_cookiedomain: string) {
        this._auth = new ExpressJwtFusionAuth(this.GetAuthServer());
        this._jwt_issuer = jwt_issuer;
        this._oauth_clientid = oauth_clientid;
        this._oauth_clientsecret = oauth_clientsecret;
        this._oauth_redirect_url = oauth_redirect_url;
        this._oauth_cookiedomain = oauth_cookiedomain;
     }

     Authenticate() {
         return this._auth;
     }

     OAuthConfig() {
      const oauthConfig = {
         clientId: this._oauth_clientid,
         clientSecret: this._oauth_clientsecret,
         redirectUri: this._oauth_redirect_url,
         cookieDomain: this._oauth_cookiedomain
       };
       return oauthConfig;
     }

     JWTSettings() {
        let oauth = this.OAuthConfig();

      const jwtOptions = {
         oauth,
         required: true,
         alwaysLogin: false,
         browserLogin: true,
         verifyOptions: {
           issuer: this._jwt_issuer,
           audience: this._oauth_clientid
         }
       };
       return jwtOptions;
     }

     

     /**
      * GetAuthServer
      *
      * @static
      * @returns {string}
      * @memberof AuthService
      */
     GetAuthServer(): string {
        // todo define logic to use fallbacks if server is down
        // for now we use always index 0
        return config.auth[0];
     }
 }