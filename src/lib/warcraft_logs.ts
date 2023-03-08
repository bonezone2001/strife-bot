import { AccessToken, ClientCredentials, Token } from "simple-oauth2";
import axios from "axios";

// Create a warcraft logs client
export class WarcraftLogsClient {
    private access_token: AccessToken = {} as AccessToken;

    constructor() {
        const oauth2 = new ClientCredentials({
            client: {
                id: process.env.WARCRAFT_LOGS_ID!,
                secret: process.env.WARCRAFT_LOGS_SECRET!
            },
            auth: {
                tokenHost: "https://www.warcraftlogs.com",
                tokenPath: "/oauth/token"
            }
        });

        this.initAccessToken(oauth2);
    }

    private async initAccessToken(oauth2: ClientCredentials) {
        // Get the access token object for the client
        this.access_token = await oauth2.getToken({});

        // Set a timeout to refresh it before it expires
        setTimeout(async () => {
            if (this.access_token.expired(300)) {
                // Note that refresh() does not work for client credentials grant
                this.access_token = await oauth2.getToken({});
            }
        }, 180_000); 
    }

    public async getRaw(query: string, variables?: any) {
        return axios({
            method: 'post',
            url: 'https://www.warcraftlogs.com/api/v2/client',
            headers: {
                Authorization: `Bearer ${this.access_token.token.access_token}`
            },
            data: {
                query,
                variables
            }
        })
    }

    // Get data from warcraft logs graphql api
    public async getReportImportant(code: string) {
        // Run query
        return (await this.getRaw(`
            query($code: String) {
                reportData {
                    report(code: $code) {
                        startTime
                        endTime
                        title
                        owner {
                            name
                        }
                        
                        fights {
                            averageItemLevel
                            name
                            kill
                            encounterID
                        }
                    }
                }
            }
        `,
        { code }
        )).data;
    }
}