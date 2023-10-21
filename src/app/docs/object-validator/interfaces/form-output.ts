export interface UserFormOutput {
  name: string;
  email: string;
  secondName: string;
  age: number;
  hobbies: string[];
  city: UserCity;
}

export interface UserCity {
  name: string;
  country: string;
}
