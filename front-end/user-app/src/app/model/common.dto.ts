export interface User {
  id: number;
  name: string;
  emailId: string;
  city: string;
}

export interface UserDetail {
  id: number;
  name: string;
  emailId: string;
  street: string;
  city: string;
  zipcode: string;
  companyName: string;
  phoneNumber: string;
  userId?: number;
}
