import { useMutation } from "@tanstack/react-query";
import apiRequestService from "../services/api-request.service";
import type { CreateRequestType } from "../types/schemas";

interface Props {
    successCb?: () => void;
    errorCb?: (e: any) => void;
}

export default function useRequest({ errorCb, successCb }: Props) {
    const { mutateAsync: createRequestMutation } = useMutation({
        mutationFn: async (request: CreateRequestType) => {
            return await apiRequestService.create(request);
        },
        onSuccess: successCb,
        onError: errorCb,
    });

    return { createRequestMutation };
}
