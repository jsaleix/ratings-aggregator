import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { displayMsg } from "../../../shared/utils/toast";
import PageHeader from "../../../shared/ui/page-header";
import Button from "../../../shared/ui/button";
import { useAuthContext } from "../../../core/auth/provider";
import type { CreateRequestType } from "../types/schemas";
import apiRequestService from "../services/api-request.service";
import RequestForm from "../components/new-request-form";
import RequestPremiumForm from "../components/new-request-premium-form";

export default function NewRequestPage() {
    const navigate = useNavigate();
    const { role } = useAuthContext();
    const [searchBy, setSearchBy] = useState<"title" | "tmdbId">("tmdbId");

    const displayChoices = role === "admin" || role === "premium";

    const { mutateAsync: createRequest } = useMutation({
        mutationFn: async (request: CreateRequestType) => {
            return await apiRequestService.create(request);
        },
        onSuccess: () => {
            displayMsg("Request successfuly added!", "success");
            navigate("/requests");
        },
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="New request">
                    {displayChoices && (
                        <div className="flex items-center gap-5">
                            <Button
                                variant={
                                    searchBy === "title" ? "primary" : "default"
                                }
                                onClick={() => setSearchBy("title")}
                            >
                                Search by Title
                            </Button>
                            <Button
                                variant={
                                    searchBy === "tmdbId"
                                        ? "primary"
                                        : "default"
                                }
                                onClick={() => setSearchBy("tmdbId")}
                            >
                                Search by TMDB ID
                            </Button>
                        </div>
                    )}
                </PageHeader>
                <div className="flex md:w-2/3">
                    {searchBy === "title" && (
                        <RequestPremiumForm
                            label="Create"
                            action={createRequest}
                        />
                    )}
                    {searchBy === "tmdbId" && (
                        <RequestForm label="Create" action={createRequest} />
                    )}
                </div>
            </div>
        </div>
    );
}
