/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface UpdateParams {
    q?: string;
    page?: number;
    sort?: string;
    brand?: string;
    color?: string;
}

export const useUrlState = () => {
    const [searchParams, setSearchParams] =
        useSearchParams();

    const query =
        searchParams.get("q") ?? "";

    const page = Number(
        searchParams.get("page") ?? "1"
    );

    const sort =
        searchParams.get("sort") ?? "";

    const brand =
        searchParams.get("brand") ?? "";

    const color =
        searchParams.get("color") ?? "";

    const updateParams = useCallback(
        ({
            q,
            page,
            sort,
            brand,
            color,
        }: UpdateParams) => {
            const params =
                new URLSearchParams(searchParams);

            if (q !== undefined) {
                q
                    ? params.set("q", q)
                    : params.delete("q");
            }

            if (page !== undefined) {
                params.set(
                    "page",
                    String(page)
                );
            }

            if (sort !== undefined) {
                sort
                    ? params.set("sort", sort)
                    : params.delete("sort");
            }

            if (brand !== undefined) {
                brand
                    ? params.set("brand", brand)
                    : params.delete("brand");
            }

            if (color !== undefined) {
                color
                    ? params.set("color", color)
                    : params.delete("color");
            }

            setSearchParams(params);
        },
        [searchParams, setSearchParams]
    );

    return {
        query,
        page,
        sort,
        brand,
        color,
        updateParams,
    };
};