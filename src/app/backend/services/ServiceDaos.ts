import { WhereFilterOp } from "@firebase/firestore";
import { firestore } from "firebase-admin";
import FieldPath = firestore.FieldPath;

export interface IQuery {
  field: string | FieldPath;
  operator: WhereFilterOp;
  value: any;
}
