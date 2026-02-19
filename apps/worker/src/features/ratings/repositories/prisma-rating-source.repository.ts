import { PrismaClient } from "../../../../generated/prisma";
import { db } from "../../../core/db";
import { RatingSourceRepositoryI } from "../interfaces/repositories";

export class PrismaRatingSourceRepository implements RatingSourceRepositoryI {
    db: PrismaClient;

    constructor() {
        this.db = db;
    }

    async findAll() {
        return this.db.rating_Source.findMany();
    }
}
