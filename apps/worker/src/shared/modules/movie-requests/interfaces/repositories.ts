import { MovieRequestModel } from "../types/db";

export interface MovieRequestRepositoryI {
    updateRequestState(
        requestId: string,
        value: boolean,
    ): Promise<MovieRequestModel>;
}
