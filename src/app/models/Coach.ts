import { User } from './User';

export interface Coach extends User {
  squadra: string;
  ruoloAllenato: string;
}
