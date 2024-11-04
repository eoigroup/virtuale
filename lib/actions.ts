export const USER_ACTIONS = {
  GET_USER: "get_user",
  UPDATE_USER: "update_user",
};

export const PERSONA_ACTIONS = {
  FETCH_ALL_PERSONAS: "get_all_personas",
  FETCH_ALL_TEMPLATE_PERSONAS: "get_all_templates",
  FETCH_AGENT: "get_persona",
  UPDATE_AGENT: "update_persona",
  DELETE_AGENT: "delete_persona",
  CREATE_AGENT: "create_persona",
  CLONE_AGENT: "clone_persona",
  USER_LOGS: "get_persona_users_logs",
  GET_ALL_USERS: "get_all_users",
  GET_ALL_PERSONA_USERS: "get_all_persona_users",
  GET_USER_CONVOS: "get_user_convos",
  GET_USER_MESSAGES: "get_user_messages",
  GET_ALL_CATEGORIES: "get_all_categories",
  GET_KNOWLEDGE_LOGS: "get_knowledge_logs",
  GET_VOICES: "get_voices",
  GET_ALL_VIRTUALE_PERSONAS: "get_all_virtuale_personas",
};

export const SUBSCRIPTION_ACTIONS = {
  GET_SUBSCRIPTIONS: "get_subs",
};

export const STATS_ACTIONS = {
  GET_PERSONA_STATS: "get_persona_stats",
  GET_ALL_STATS: "get_all_stats",
  GET_USER_STATS: "get_user_stats",
} as const;
