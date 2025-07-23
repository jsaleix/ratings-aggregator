import PageHeader from "../../shared/ui/page-header";

export default function AboutPage() {
    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="About">
                    <p className="text-text-secondary">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis ipsam accusamus expedita voluptates eos
                        perspiciatis, alias ullam esse aliquid minus maiores
                        rem, saepe odio? Nulla doloribus accusamus culpa ut
                        dolorem?
                    </p>
                </PageHeader>
            </div>
        </div>
    );
}
