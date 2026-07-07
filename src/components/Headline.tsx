export interface HeadlineProps extends React.HTMLAttributes<HTMLDivElement> {
    level: 1 | 2 | 3;
}

export const Headline = ({ level, className = "", children, ...props }: HeadlineProps) => {
    const Tag = level === 3 ? "div" : (`h${level}` as "h1" | "h2");
    const base =
        level === 3
            ? "text-xl sm:text-2xl text-transparent bg-clip-text bg-red-right font-bold "
            : "text-4xl sm:text-5xl text-transparent bg-clip-text bg-red-right font-bold pb-2 ";
    return (
        <Tag className={base + className} {...props}>
            {children}
        </Tag>
    );
};
