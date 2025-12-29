import type { RoleType } from "../../../core/auth/constants";
import type { UserType } from "../../auth/types/user";
import type { GetOneFullResponse } from "../types/users.api";

class FullUserMapper {
    static fromApi(response: GetOneFullResponse): UserType {
        const { role, ...rest } = response;
        return { ...rest, role: role as RoleType } satisfies UserType;
    }
}

export default FullUserMapper;
