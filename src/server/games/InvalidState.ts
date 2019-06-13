import {CustomError} from "ts-custom-error";

export class InvalidState extends CustomError {
    public constructor(public msg: string) {
        super();
    }
}
