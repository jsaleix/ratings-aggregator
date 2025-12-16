import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import { useAuthContext } from "../../../core/auth/provider";
import Divider from "../../../shared/ui/divider";
import PageHeader from "../../../shared/ui/page-header";
import { notify, displayMsg } from "../../../shared/utils/toast";

import profileService from "../services/profile.service";
import type { UpdatePasswordType, UpdateProfileType } from "../types/auth";
import DeletePart from "../components/profile/delete-part";
import LogoutPart from "../components/profile/logout-part";
import PasswordForm from "../components/profile/password-form";
import ProfileForm from "../components/profile/profile-form";

export default function ProfilePage() {
    const { logout } = useAuthContext();
    const { mutate: deleteAction } = useMutation({
        mutationFn: profileService.deleteProfile,
        onSuccess: () => {
            logout();
            notify("Account successfully deleted");
        },
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    const updatePassword = useCallback(async (value: UpdatePasswordType) => {
        try {
            await profileService.updatePassword(
                value.current_password,
                value.password
            );
            displayMsg("Password updated!", "success");
            return true;
        } catch (e: any) {
            if (e instanceof Error) displayMsg(e.message, "error");
            else displayMsg("Could not update your password", "error");
            return false;
        }
    }, []);

    const updateProfile = useCallback(async (value: UpdateProfileType) => {
        try {
            const { email, username } = value;
            await profileService.updateProfile(email, username);
            displayMsg("Account updated!", "success");
            return true;
        } catch (e: any) {
            if (e instanceof Error) displayMsg(e.message, "error");
            else displayMsg("Could not update your account", "error");
            return false;
        }
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="Profile" />
                <div className="flex flex-col gap-3">
                    <ProfileForm updateAction={updateProfile} />
                    <Divider />
                    <PasswordForm updatePassword={updatePassword} />
                    <Divider />
                    <LogoutPart logout={logout} />
                    <Divider />
                    <DeletePart deleteAction={deleteAction} />
                </div>
            </div>
        </div>
    );
}
