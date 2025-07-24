import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import Button from "../../../../shared/ui/button";
import ProfilePart from "./field";
import profileService from "../../services/profile.service";
import { useAuthContext } from "../../../../core/auth/provider";
import { displayMsg, notify } from "../../../../shared/utils/toast";

interface Props {}

export default function DeletePart({}: Props) {
    const { logout } = useAuthContext();
    const { mutate } = useMutation({
        mutationFn: profileService.deleteProfile,
        onSuccess: () => {
            logout();
            notify("Account successfully deleted");
        },
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    const onClick = useCallback(() => {
        if (window.confirm("Do you really want to perform this action?")) {
            mutate();
        }
    }, []);

    return (
        <ProfilePart name="Delete my account">
            <Button onClick={onClick}>Delete my account...</Button>
        </ProfilePart>
    );
}
