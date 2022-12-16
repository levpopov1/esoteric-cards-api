import { Document } from 'mongoose';

declare global {
  declare namespace Express {
    export interface Request {
      user?: Document;
      items?: Document[];
      item?: Document;
    }
    export interface Response {
      user?: Document;
      items?: Document[];
      item?: Document;
    }
  }
}
