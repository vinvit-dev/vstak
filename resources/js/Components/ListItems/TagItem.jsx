import {Link} from "@inertiajs/react";

export const TagItem = ({tag}) => {
    return (
        <div key={tag.id} className={"border border-blue-200 rounded pl-1 pr-1 w-min bg-blue-50 text-sm text-gray-700"}>
            <Link href={route('tags.show', tag)} className={"text-nowrap"}>{tag.name}</Link>
        </div>
    )
};
