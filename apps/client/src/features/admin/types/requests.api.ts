import type { RequestAdminModel } from "../models/request.admin";

export type ApiRequestType = {
    id: string;
    created_at: string;
    tmdb_id: string;
    processed: boolean;
    title: string;
    User: {
        id: string;
        username: string;
        email: string;
    };
};

export function mapApiAdminRequestToModel(
    payload: ApiRequestType,
): RequestAdminModel {
    const { User, ...rest } = payload;
    return {
        ...rest,
        creator: User,
    };
}
