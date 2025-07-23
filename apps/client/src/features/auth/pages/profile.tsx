import PageHeader from "../../../shared/ui/page-header";

export default function ProfilePage() {
    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5">
                <PageHeader title="Profile" />
                <div className="flex flex-col"></div>
            </div>
        </div>
    );
}
