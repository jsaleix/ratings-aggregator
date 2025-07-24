import { PrismaClient } from "../../../../generated/prisma";

class MovieRequestService {
    db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    async updateRequestState(requestId: string, value: boolean) {
        return await this.db.movie_Request.update({
            where: { id: requestId },
            data: {
                processed: value,
            },
        });
    }
}

export default MovieRequestService;
