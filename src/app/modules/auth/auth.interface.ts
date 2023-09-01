/* eslint-disable no-unused-vars */
export enum userRole {
  admin = 'admin',
  customer = 'customer',
}

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: userRole;
  contactNo: string;
  address: string;
  profileImg: string;
  createdAt?: Date;
  updatedAt?: Date;
};
