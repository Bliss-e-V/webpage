export interface HeadlineProps extends React.HTMLAttributes<HTMLDivElement> {
    level: 1 | 2 | 3;
}

export const NewsHeadline = ({ level, className = "", children }: HeadlineProps) => {
    const Tag = level === 3 ? "div" : (`h${level}` as "h1" | "h2");
    const base =
        level === 3
            ? "text-xl bliss-red font-bold "
            : "text-4xl sm:text-5xl bliss-red font-bold ";
    return <Tag className={base + className}>{children}</Tag>;
};
