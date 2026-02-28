import type { RequestAdminModel } from "../models/request.admin";

export type ApiAdminRequestType = {
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
    payload: ApiAdminRequestType,
): RequestAdminModel {
    const { User, ...rest } = payload;
    return {
        ...rest,
        creator: User,
    };
}
