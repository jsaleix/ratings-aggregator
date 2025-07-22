import { useMutation } from "@tanstack/react-query";
import RequestForm from "../components/new-request-form";
import type { CreateRequestType } from "../types/movie-request";
import apiRequestService from "../services/api-request.service";
import { useNavigate } from "react-router";
import { displayMsg } from "../../../shared/utils/toast";

export default function NewRequestPage() {
    const navigate = useNavigate();
    const { mutateAsync: createRequest } = useMutation({
        mutationFn: async (request: CreateRequestType) => {
            return await apiRequestService.create(request);
        },
        onSuccess: () => {
            navigate("/requests");
        },
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 px-5 xl:px-0">
                <header className="relative flex flex-col items">
                    <h2 className="text-2xl">Movie Request</h2>
                </header>
                <div className="flex md:w-2/3">
                    <RequestForm label="Create" action={createRequest} />
                </div>
            </div>
        </div>
    );
}
