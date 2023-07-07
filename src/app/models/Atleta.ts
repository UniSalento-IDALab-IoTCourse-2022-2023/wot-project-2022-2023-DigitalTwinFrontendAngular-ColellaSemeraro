import { User } from './User';

export interface Atleta extends User {
  altezza: number;
  peso: number;
  squadra: string;
  posizioneCampo: string;
  idCoach: string;
}
