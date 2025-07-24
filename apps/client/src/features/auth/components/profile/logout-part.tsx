import { useAuthContext } from "../../../../core/auth/provider";
import Button from "../../../../shared/ui/button";
import ProfilePart from "./field";

interface Props {}

export default function LogoutPart({}: Props) {
    const { logout } = useAuthContext();

    return (
        <ProfilePart name="Session">
            <Button onClick={logout}>Logout</Button>
        </ProfilePart>
    );
}
