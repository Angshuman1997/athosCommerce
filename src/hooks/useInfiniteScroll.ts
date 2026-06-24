import {
    useEffect,
    useRef,
} from "react";

interface Props {
    hasMore: boolean;
    loading: boolean;
    onLoadMore: () => void;
}

export const useInfiniteScroll = ({
    hasMore,
    loading,
    onLoadMore,
}: Props) => {
    const ref =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer =
            new IntersectionObserver(
                ([entry]) => {
                    if (
                        entry.isIntersecting &&
                        hasMore &&
                        !loading
                    ) {
                        onLoadMore();
                    }
                },
                {
                    threshold: 0.5,
                }
            );

        const current =
            ref.current;

        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(
                    current
                );
            }
        };
    }, [
        hasMore,
        loading,
        onLoadMore,
    ]);

    return ref;
};