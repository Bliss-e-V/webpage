import type { ReactElement } from "react";

interface Props {
  id?: string;
  hover?: boolean;
  children: ReactElement;
  className?: string;
};

export default function BigButton({ id, hover, children, className }: Props) {
  return (
    <div
      id={id}
      className={`tracking-wider text-accent bg-accent-dark px-4 py-2 text-2xl font-medium text-center rounded-lg no-underline text-nowrap max-w-min ${hover ? "hover:shadow-accent-small transition-shadow" : ""
        } ${className}`}
    >
      {children}
    </div>
  );
}
