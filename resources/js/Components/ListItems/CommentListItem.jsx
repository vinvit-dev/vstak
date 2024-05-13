import parse from "html-react-parser";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import TimeAgo from "javascript-time-ago";

export const CommentListItem = ({ comment, user = null, openEdit = null, isSolution = false }) => {

    const isAuthor = user && user.id === comment.uid;
    const timeAgo = new TimeAgo('en-US')
    return (
        <div className={"flex w-full border-b border-gray-400 p-4"}>
            <div className={"flex flex-col justify-between items-center font-medium text-3xl w-full max-w-[100px] mr-4"}>
                {isSolution ? <div className={"text-green-700 text-3xl dark:text-green-300"}>✓</div> : null}
            </div>
            <div className={"w-full"}>
                {parse(comment.body)}
                <div className={"flex justify-between gap-2 text-gray-400 pt-3"}>
                    <div className={"flex gap-1"}>
                        {isAuthor && openEdit ? <div className={"text-gray-400 hover:text-gray-100 hover:underline hover:cursor-pointer"} onClick={() => openEdit(comment)}>Edit |</div> : <div></div>}
                        <div>Edited: {timeAgo.format(Date.parse(comment.updated_at))}</div>
                    </div>
                    <div className={"justify-self-end"}>Author: {comment.author.name}</div>
                </div>
            </div>
        </div>
    )
};
