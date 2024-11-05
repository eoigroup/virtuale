export type IUser = {
  billing_email: string;
  country: string;
  creator_account_type: "personal" | "business";
  creator_address_line_1: string;
  creator_address_line_2: string;
  creator_billing_full_address: string;
  creator_business_name: string;
  creator_city: string;
  creator_country: string;
  creator_first_name: string;
  creator_full_name: string;
  creator_last_name: string;
  creator_postal_code: string;
  creator_state: string;
  creator_tax_number: string;
  creator_tier: number;
  date_joined: string;
  dob: string;
  email: string;
  fe_console_creator_chat_avatarid: string;
  fe_console_creator_chatid: string;
  fe_console_creator_lang: string;
  fe_console_creator_screenmode: "light" | "dark";
  fe_console_creator_show_chat_avatar: boolean;
  fe_console_show_creator_chat: boolean;
  gander: string;
  interest: string;
  is_active: boolean;
  name: string;
  nickname: string;
  payout_emailaddress: string;
  payout_provider: string;
  phone_number: string | null;
  profile_picture: string;
  sanitize_limit: number;
  star_sign: string;
  unique_id: string;
  username: string;
  self_describe: string
  creator_balance: number
  virtuale_member_type: string
};

export type DecodedJWT = {
  unique_id: string;
  exp: number
  // Add other properties if needed
};
