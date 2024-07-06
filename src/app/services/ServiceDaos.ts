import { WhereFilterOp } from "@firebase/firestore";

export interface IQuery {
  field: string;
  operator: WhereFilterOp;
  value: any;
}
