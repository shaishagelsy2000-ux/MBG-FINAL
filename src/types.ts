export type Role = 'pelajar' | 'ibu_hamil' | 'ibu_menyusui' | 'guru';

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
  sekolah?: string;
  kota?: string;
  alergi?: string;
  penyakit?: string;
}

export type View = 'home' | 'login' | 'register' | 'dashboard';
