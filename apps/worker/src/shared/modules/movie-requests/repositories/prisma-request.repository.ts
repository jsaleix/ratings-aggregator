import { PrismaClient } from "../../../../../generated/prisma";
import { db } from "../../../../core/db";
import { MovieRequestRepositoryI } from "../interfaces/repositories";
import { MovieRequestModel } from "../types/db";

class PrismaMovieRequestRepository implements MovieRequestRepositoryI {
    db: PrismaClient;

    constructor() {
        this.db = db;
    }

    async updateRequestState(
        requestId: string,
        value: boolean,
    ): Promise<MovieRequestModel> {
        const request = await this.db.movie_Request.findUnique({
            where: { id: requestId },
        });
        if (!request) throw new Error("Request not found");
        return await this.db.movie_Request.update({
            where: { id: requestId },
            data: {
                processed: value,
            },
        });
    }
}

export default PrismaMovieRequestRepository;
