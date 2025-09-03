import { useCallback } from "react";

import Button from "../../../../shared/ui/button";
import ProfilePart from "./field";

interface Props {
    deleteAction: () => any;
}

export default function DeletePart({ deleteAction }: Props) {
    const onClick = useCallback(() => {
        if (window.confirm("Do you really want to perform this action?")) {
            deleteAction();
        }
    }, []);

    return (
        <ProfilePart name="Delete my account">
            <Button variant={"danger"} onClick={onClick}>
                Delete my account...
            </Button>
        </ProfilePart>
    );
}
