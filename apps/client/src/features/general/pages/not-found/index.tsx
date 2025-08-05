import PageHeader from "../../../../shared/ui/page-header";

export default function NotFoundPage() {
    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="Oops 😥">
                    <p className="text-text-secondary">
                        The page you're looking for does not exist
                    </p>
                </PageHeader>
            </div>
        </div>
    );
}
