export interface GetUserQuery {
  page: number;
  limit?: number;
  username?: string;
  role?: number;
  gender?: string;
}
