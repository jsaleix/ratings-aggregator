import Button from "../../../../shared/ui/button";
import ProfilePart from "./field";

interface Props {
    logout: () => any;
}

export default function LogoutPart({ logout }: Props) {
    return (
        <ProfilePart name="Session">
            <Button onClick={logout}>Logout</Button>
        </ProfilePart>
    );
}
