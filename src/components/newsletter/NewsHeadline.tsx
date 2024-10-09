export interface HeadlineProps extends React.HTMLAttributes<HTMLDivElement> {
    level: 1 | 2 | 3;
}

export const NewsHeadline = (props: HeadlineProps) => {
    return <>
        {
            props.level === 1 &&
            <h1
                className={"text-4xl sm:text-5xl bliss-red font-bold " + props.className}
            >
                {props.children}
            </h1>
        }
        {
            props.level === 2 &&
            <h2
                className={"text-4xl sm:text-5xl bliss-red font-bold " + props.className}
            >
                {props.children}
            </h2>
        }
        {
            props.level === 3 &&
            <div
                className={"text-xl bliss-red font-bold " + props.className}
            >
                {props.children}
            </div>
        }
    </>;
}