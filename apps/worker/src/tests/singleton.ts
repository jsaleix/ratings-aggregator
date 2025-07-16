import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import { db } from "../core/db";
import { PrismaClient } from "../../generated/prisma";

jest.mock("../core/db", () => ({
    __esModule: true,
    db: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;
