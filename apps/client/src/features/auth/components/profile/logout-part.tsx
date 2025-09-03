import Button from "../../../../shared/ui/button";
import LogoutIcon from "../../../../shared/ui/icons/logout-icon";
import ProfilePart from "./field";

interface Props {
    logout: () => any;
}

export default function LogoutPart({ logout }: Props) {
    return (
        <ProfilePart name="Session">
            <Button
                variant={"default"}
                onClick={logout}
                className="flex items-center gap-3"
            >
                <LogoutIcon />
                Logout
            </Button>
        </ProfilePart>
    );
}
