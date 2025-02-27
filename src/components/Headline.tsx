export interface HeadlineProps extends React.HTMLAttributes<HTMLDivElement> {
    level: 1 | 2 | 3;
}

export const Headline = (props: HeadlineProps) => {
    return <>
        {
            props.level === 1 &&
            <h1
                className={"text-4xl sm:text-5xl text-transparent bg-clip-text bg-red-right font-bold " + props.className}
            >
                {props.children}
            </h1>
        }
        {
            props.level === 2 &&
            <h2
                className={"text-4xl sm:text-5xl text-transparent bg-clip-text bg-red-right font-bold " + props.className}
            >
                {props.children}
            </h2>
        }
        {
            props.level === 3 &&
            <div
                className={"text-xl sm:text-2xl text-transparent bg-clip-text bg-red-right font-bold " + props.className}
            >
                {props.children}
            </div>
        }
    </>;
}