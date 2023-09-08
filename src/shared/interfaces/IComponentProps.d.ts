import React from 'react'
import User from "./IUser";

export default interface IComponentProps {
  user: User;
  loading?: boolean;
  children?: React.ReactNode;
}
