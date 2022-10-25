import { setCookie, getCookie, removeCookie } from 'typescript-cookie';

export class Session {

    /**
     * Validate if session exists
     * @param sessionId
     * @returns true if the session exists
     */
    validate(sessionId: string): boolean {
        if(getCookie('session') && getCookie('session') === sessionId) {
            return true;
        }
        return false;
    }

    /**
     * Prepare the session
     * @returns created or validated session
     */
    start() {
        if(getCookie('session')) {
           
        }
        return this.create();
    }

    /**
     * Create a session
     * @returns UUID of the created session
     */
    create(): string {
        const uuid = this.createSessionId();
        setCookie('session', uuid);
        return uuid;
    }

    /**
     * like a 'logout' this function deletes the session
     */
    expire(){
        removeCookie('session');
    }

    /**
     * Create unique ID for a session
     * @returns UID for a session
     */
    createSessionId(): string {
        const range: string = 'ABCDEFGHIJKLMNOPQRSTUVWQXYabcdefghijklmnopqrstuvwxyz123456789';
        let sessionId: string = '';
        for ( var i = 0; i < 8; i++ ) {
            sessionId += range.charAt(Math.floor(Math.random() * 8));
        }

        return sessionId;
    }

    get id() {
        return getCookie('session') ?? '';
    }
}