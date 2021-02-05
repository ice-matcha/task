import { INC, DEC } from "../const/counter.const.js";

export const inc = payload => ({ type: INC, payload});
export const dec = payload => ({ type: DEC, payload});