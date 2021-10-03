export type Friend = {
  avatar: string;
  bio: string;
  birthday: string;
  email: string;
  firstName: string;
  gamesCount: number;
  gender: string;
  id: number;
  isAdmin: boolean;
  lastName: string;
  url: string;
};
export type State = {
  friendsList: Array<Friend>;
  searchInput: string;

};
export const state: State = {
    friendsList:[],
    searchInput:'',
    };
