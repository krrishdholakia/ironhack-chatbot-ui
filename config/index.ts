export const config = {
  userServiceHost: process.env.NEXT_PUBLIC_USER_SERVICE_HOST,
  salesforceConnectorHost: process.env.NEXT_PUBLIC_SALESFORCE_CONNECTOR_HOST,
  gtm: {
    id: process.env.NEXT_PUBLIC_GTM_ID,
    serverUrl: process.env.NEXT_PUBLIC_GTM_SERVER_URL,
  },
  n8n: {
    endpoint: process.env.N8N_SATISFACTION_SURVEY_ENDPOINT,
    apiKey: process.env.N8N_API_KEY,
  },
};
