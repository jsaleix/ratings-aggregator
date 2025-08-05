import Select from "../../../shared/ui/select";
import type { FiltersType } from "../hooks/use-filters";

type OrderType = FiltersType["order"];
type OrderByType = FiltersType["orderBy"];

interface Props {
    filters: FiltersType;
    changeOrder: (order: OrderType) => void;
    changeOrderBy: (order: OrderByType) => void;
}

const orders = ["asc", "desc"] as const;

const orderByValues = {
    title: "Title",
    created_at: "Recently added",
    year: "Release year"
} as const;

export default function FiltersPart({
    filters: { order, orderBy },
    changeOrder,
    changeOrderBy,
}: Props) {
    return (
        <div className="w-full flex items-center gap-3">
            <Select
                name="order"
                id="order"
                className="capitalize"
                value={order}
                onChange={(e) => changeOrder(e.target.value as OrderType)}
            >
                {orders.map((o) => (
                    <option value={o} key={o}>
                        {o}
                    </option>
                ))}
            </Select>
            <Select
                name="orderBy"
                id="orderBy"
                className="capitalize"
                value={orderBy}
                onChange={(e) => changeOrderBy(e.target.value as OrderByType)}
            >
                {Object.entries(orderByValues).map(([key, value]) => (
                    <option value={key} key={key}>
                        {value}
                    </option>
                ))}
            </Select>
        </div>
    );
}
