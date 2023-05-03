import { OAuth2Client } from "google-auth-library";

// Download your OAuth2 configuration from the Google
// import * as keys from "../../../keys/oauth2/oauth2.keys.json";

class GoogleAuthClient {
    private static instance: GoogleAuthClient;
    private oAuth2Client: OAuth2Client;

    private constructor() {
        if(GoogleAuthClient.instance) {
            throw new Error("Error - already initialized");
        }
        this.oAuth2Client = new OAuth2Client(
            "", // keys.web.client_id,
            "" // keys.web.client_secret
        )
    }

    static getInstance(): GoogleAuthClient {
        GoogleAuthClient.instance = GoogleAuthClient.instance || new GoogleAuthClient();
        return GoogleAuthClient.instance;
    }

    async getUser(token: string): Promise<any | null | Error> {
        try {
            const ticket = await this.oAuth2Client.verifyIdToken({
                idToken: token,
                audience: "", // keys.web.client_id
            });
            const payload = ticket.getPayload();
            if(payload && payload.email) {
                const userId = payload.sub;
                const email = payload.email;
                const name = payload.name;
                const imageUrl = payload.picture;
                return { userId, email, name, imageUrl };
            }
            else {
                return null;
            }
        }
        catch(err) {
            console.error("getUser.err: ", err);
            return err;
        }
    }
}

export const GoogleAuthClientInstance = GoogleAuthClient.getInstance();
