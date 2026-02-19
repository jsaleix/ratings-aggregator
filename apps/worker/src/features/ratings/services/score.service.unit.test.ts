import { ScoreService, type CalcScoreRatingItem } from "./score.service";

describe("scoreService", () => {
    let scoreService: ScoreService;

    beforeAll(() => {
        scoreService = new ScoreService();
    });

    describe("getScore", () => {
        it("Should return correct result #1", () => {
            const rating = {
                value: "100",
                Rating_Source: {
                    rating_unit: "percentage",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(100);
        });
        it("Should return correct result #2", () => {
            const rating = {
                value: "5",
                Rating_Source: {
                    rating_unit: "stars",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(100);
        });
        it("Should return correct result #3", () => {
            const rating = {
                value: "10",
                Rating_Source: {
                    rating_unit: "points",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(100);
        });
        it("Should return correct result #4", () => {
            const rating = {
                value: "3",
                Rating_Source: {
                    rating_unit: "stars",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(60);
        });
        it("Should return correct result #5", () => {
            const rating = {
                value: "3.5",
                Rating_Source: {
                    rating_unit: "stars",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(70);
        });
        it("Should return correct result #5", () => {
            const rating = {
                value: "0",
                Rating_Source: {
                    rating_unit: "stars",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(0);
        });
        it("Should return correct result #6", () => {
            const rating = {
                value: "1",
                Rating_Source: {
                    rating_unit: "stars",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(20);
        });
        it("Should return correct result #7", () => {
            const rating = {
                value: "3.5",
                Rating_Source: {
                    rating_unit: "points",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(35);
        });
        it("Should return correct result #8", () => {
            const rating = {
                value: "1",
                Rating_Source: {
                    rating_unit: "points",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(10);
        });
        it("Should return correct result #8", () => {
            const rating = {
                value: "0",
                Rating_Source: {
                    rating_unit: "points",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(0);
        });
        it("Should return correct result #9", () => {
            const rating = {
                value: "0",
                Rating_Source: {
                    rating_unit: "percentage",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(0);
        });
        it("Should return correct result #10", () => {
            const rating = {
                value: "57",
                Rating_Source: {
                    rating_unit: "percentage",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(57);
        });
        it("Should return correct result #11", () => {
            const rating: any = {
                value: "57",
                Rating_Source: {
                    rating_unit: "RoTtEnTomAtoES_FictIOnAl",
                },
            };
            expect(scoreService.getScore(rating)).toBe(undefined);
        });
        it("Should return a value between 0 and 100", () => {
            const rating = {
                value: "-1",
                Rating_Source: {
                    rating_unit: "percentage",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(0);
        });
        it("Should return a value between 0 and 100", () => {
            const rating = {
                value: "101",
                Rating_Source: {
                    rating_unit: "percentage",
                },
            } satisfies CalcScoreRatingItem;
            expect(scoreService.getScore(rating)).toBe(100);
        });
    });
    describe("calcScore", () => {
        it("Should return correct result #1", () => {
            const ratings = [
                {
                    value: "100",
                    Rating_Source: {
                        rating_unit: "percentage",
                    },
                },
            ] satisfies CalcScoreRatingItem[];
            expect(scoreService.calcScore(ratings)).toBe(100);
        });
        it("Should return correct result #2: percent + undefined", () => {
            const ratings: any[] = [
                {
                    value: "100",
                    Rating_Source: {
                        rating_unit: "percentage",
                    },
                },
                {
                    value: "57",
                    Rating_Source: {
                        rating_unit: "potatoes",
                    },
                },
            ];
            expect(scoreService.calcScore(ratings)).toBe(100);
        });
        it("Should return correct result #3", () => {
            const ratings = [
                {
                    value: "100",
                    Rating_Source: {
                        rating_unit: "percentage",
                    },
                },
                {
                    value: "2",
                    Rating_Source: {
                        rating_unit: "stars",
                    },
                },
            ] satisfies CalcScoreRatingItem[];
            expect(scoreService.calcScore(ratings)).toBe(70);
        });
        it("Should return correct result #4", () => {
            const ratings = [
                {
                    value: "100",
                    Rating_Source: {
                        rating_unit: "percentage",
                    },
                },
                {
                    value: "2",
                    Rating_Source: {
                        rating_unit: "stars",
                    },
                },
                {
                    value: "4",
                    Rating_Source: {
                        rating_unit: "stars",
                    },
                },
                {
                    value: "8",
                    Rating_Source: {
                        rating_unit: "points",
                    },
                },
            ] satisfies CalcScoreRatingItem[];
            expect(scoreService.calcScore(ratings)).toBe(75);
        });
        it("Should return correct result #4", () => {
            const ratings = [
                {
                    value: "100",
                    Rating_Source: {
                        rating_unit: "percentage",
                    },
                },
                {
                    value: "2",
                    Rating_Source: {
                        rating_unit: "stars",
                    },
                },
                {
                    value: "4",
                    Rating_Source: {
                        rating_unit: "stars",
                    },
                },
                {
                    value: "8",
                    Rating_Source: {
                        rating_unit: "points",
                    },
                },
                {
                    value: "3.5",
                    Rating_Source: {
                        rating_unit: "stars",
                    },
                },
                {
                    value: "70",
                    Rating_Source: {
                        rating_unit: "percentage",
                    },
                },
                {
                    value: "6",
                    Rating_Source: {
                        rating_unit: "points",
                    },
                },
                {
                    value: "5",
                    Rating_Source: {
                        rating_unit: "stars",
                    },
                },
                {
                    value: "90",
                    Rating_Source: {
                        rating_unit: "percentage",
                    },
                },
                {
                    value: "1.5",
                    Rating_Source: {
                        rating_unit: "stars",
                    },
                },
                {
                    value: "7",
                    Rating_Source: {
                        rating_unit: "points",
                    },
                },
                {
                    value: "80",
                    Rating_Source: {
                        rating_unit: "percentage",
                    },
                },
                {
                    value: "3",
                    Rating_Source: {
                        rating_unit: "stars",
                    },
                },
                {
                    value: "4.5",
                    Rating_Source: {
                        rating_unit: "stars",
                    },
                },
            ] satisfies CalcScoreRatingItem[];

            expect(scoreService.calcScore(ratings)).toBe(73);
        });
    });
});
