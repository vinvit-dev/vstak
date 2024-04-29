import {Link, Head, useForm} from '@inertiajs/react';
import DefaultLayout from "@/Layouts/DefaultLayout.jsx";
import parse from "html-react-parser";
import CommentForm from "@/Pages/Post/Partials/CommentForm.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Show({ post, auth }) {
    const user = auth.user ?? null;
    let editComment = !!user;
    const {data: editData, setData} = useForm({
        comment: null
    });
    // const showCommentEditForm = (event, comment) => {
    //     // event.target.innerText = <CommentForm toPost={post} commentBody={comment.body}/>;
    //     return (
    //         <CommentForm toPost={post} commentBody={comment.body}/>
    //     );
    // };
    return (
        <>
            <Head title={post.title}/>
            <DefaultLayout user={user}>
                <div className="flex items-center flex-col">
                    <div className="p-4 mb-4 w-3/4">
                        <h2 className="text-4xl text-center font-bold pb-2">{post.title}</h2>
                        <p className="text-gray-500 dark:text-gray-600 pb-4 text-center">{post.author.name}</p>
                        <p className="w-3/4 mx-auto">{parse(post.body)}</p>
                    </div>
                    <div className="p-4 mb-4 w-3/4">
                        <h2 className="text-4xl mb-7 text-center font-bold pb-2">Comments</h2>
                        {post.comments.map(comment => {
                            if (editData.comment && editData.comment.id === comment.id) {
                               return <CommentForm key={comment.id} toPost={post} comment={comment} isUpdate={true} onUpdate={() => setData('comment', null)}/>
                            } else {
                                return (
                                    <div key={comment.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md mb-4">
                                        <div className="flex justify-between">
                                            <div className="text-xl font-bold">{comment.author.name}</div>
                                            {
                                                editComment && user.id === comment.uid ?
                                                    <PrimaryButton onClick={(e) => setData('comment', comment)}>Edit</PrimaryButton>
                                                    : null
                                            }
                                        </div>
                                        <div className="text-gray-500 dark:text-gray-600">{parse(comment.body)}</div>
                                    </div>
                                );
                            }
                        })}
                        {
                            !user ?
                                <div className="text-center">Login to leave comment</div>
                        : <CommentForm toPost={post}/>
                        }
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
