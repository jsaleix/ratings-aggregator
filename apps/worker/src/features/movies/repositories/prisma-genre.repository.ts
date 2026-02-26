import { PrismaClient } from "../../../../generated/prisma";
import { db } from "../../../core/db";
import { GenreRepositoryI } from "../interfaces/repositories";
import { GenreCreateInput } from "../types/db";

export class PrismaGenreRepository implements GenreRepositoryI {
    db: PrismaClient;

    constructor() {
        this.db = db;
    }

    async createOrUpdateGenre(data: GenreCreateInput) {
        return await this.db.genre.upsert({
            where: { tmdb_id: data.tmdb_id },
            create: data,
            update: data,
        });
    }
}
