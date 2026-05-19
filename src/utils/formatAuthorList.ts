const AUTHOR_DISPLAY_LIMIT = 5;

export function formatAuthorList(
    authors: string[],
    limit = AUTHOR_DISPLAY_LIMIT,
): string {
    if (authors.length <= limit) {
        return authors.join(", ");
    }

    return `${authors.slice(0, limit).join(", ")} et al.`;
}
