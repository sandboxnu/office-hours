export enum WSMessageType {
  Count = "count",
  Refresh = "ref",
}

// API base data types
export type Club = { name: string; rating: number; id: number };

// API route Params and Responses
export type GetClubResponse = Club[];

export type CreateClubParams = { name: string; rating: number };
export type CreateClubResponse = Club;
