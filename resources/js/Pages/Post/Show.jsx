import {Link, Head, useForm} from '@inertiajs/react';
import DefaultLayout from "@/Layouts/DefaultLayout.jsx";
import parse from "html-react-parser";
import CommentForm from "@/Pages/Post/Partials/CommentForm.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Show({ post, auth }) {
    console.log(post);
    const user = auth.user ?? null;
    let editComment = !!user;
    const {data: editData, setData} = useForm({
        comment: null
    });

    const {data: solvedData, setData: setSolved, post: makeSolved} = useForm({
        cid: post.solution_exists ? post.solution.cid : null
    });

    const markAsSolved = ({comment}) => {
        axios.post(route('posts.solve', post), {
            cid: comment.id,
        }).then(response => {
            setSolved('cid', comment.id);
        });
    };
    return (
        <>
            <Head title={post.title}/>
            <DefaultLayout user={user}>
                <div className="flex items-center flex-col">
                    <div className="p-4 mb-4 w-3/4">
                        {post.solution_exists ? <h2 className="text-green-500 text-3xl font-bold text-center">[SOLVED]</h2> : null}
                        <h2 className="text-4xl text-center font-bold pb-2">
                            {post.title}
                        </h2>
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
                                            <div className="flex items-center gap-2">
                                                {post.solution_exists && post.solution.cid === comment.id ? <span className="text-green-500 font-bold">[SOLUTION]</span> : null}
                                                <div className="text-xl font-bold">{comment.author.name}</div>
                                            </div>
                                            <div>
                                                {
                                                    editComment && user.id === comment.uid ?
                                                        <PrimaryButton onClick={(e) => setData('comment', comment)}>Edit</PrimaryButton>
                                                        : null
                                                }
                                                {
                                                    user && user.id === post.uid && !post.solution_exists ?
                                                        <PrimaryButton onClick={() =>  markAsSolved({comment})} className="ml-2">Mark as Solution</PrimaryButton>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                        <div className="text-gray-500 dark:text-gray-600">{parse(comment.body)}</div>
                                    </div>
                                );
                            }
                        })}
                        {
                            !user ?
                                <div className="text-center">Login to leave comment</div>
                            :
                                <div>
                                    <h2 className="text-3xl font-bold text-center mt-6 mb-3">Add comment</h2>
                                    <CommentForm toPost={post}/>
                                </div>
                        }
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
