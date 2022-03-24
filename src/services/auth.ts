import { ManagementClient } from "auth0";

if (!process.env.AUTH0_DOMAIN) {
    throw new Error("auth0 domain required");
}

const managementClient = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

export default managementClient;
