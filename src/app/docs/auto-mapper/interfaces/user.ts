
export interface User {
  id: string;
  fullName: string;
  email: string;
  city: string;
  config: userConfig;
}

interface userConfig {
  theme: 'light' | 'dark';
}

