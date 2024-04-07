import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { ConfigurationOptions } from "typesense/lib/Typesense/Configuration";

const TYPESENSE_SERVER_CONFIG = {
  apiKey: import.meta.env.VITE_APP_TYPESENSE_SEARCH_ONLY_API_KEY,
  nodes: [
    {
      host: import.meta.env.VITE_APP_TYPESENSE_HOST,
      port: import.meta.env.VITE_APP_TYPESENSE_PORT,
      protocol: import.meta.env.VITE_APP_TYPESENSE_PROTOCOL,
    },
  ],
  connectionTimeoutSeconds: 1,
  numRetries: 8,
} satisfies ConfigurationOptions

console.log(TYPESENSE_SERVER_CONFIG);

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  additionalSearchParameters: {
    query_by: "title,overview,genres",
    query_by_weights: "4,2,1",
    num_typos: 3,
    typo_tokens_threshold: 1,
  },
});

export const searchClient = typesenseAdapter.searchClient;
