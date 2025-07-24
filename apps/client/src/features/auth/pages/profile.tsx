import Divider from "../../../shared/ui/divider";
import PageHeader from "../../../shared/ui/page-header";

import DeletePart from "../components/profile/delete-part";
import LogoutPart from "../components/profile/logout-part";
import PasswordForm from "../components/profile/password-form";
import ProfileForm from "../components/profile/profile-form";

export default function ProfilePage() {
    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="Profile" />
                <div className="flex flex-col gap-3">
                    <ProfileForm />
                    <Divider />
                    <PasswordForm />
                    <Divider />
                    <LogoutPart />
                    <Divider />
                    <DeletePart />
                </div>
            </div>
        </div>
    );
}
