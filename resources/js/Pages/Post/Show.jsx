import { Link, Head } from '@inertiajs/react';
import DefaultLayout from "@/Layouts/DefaultLayout.jsx";
import parse from "html-react-parser";
import AddCommentForm from "@/Pages/Post/Partials/AddCommentForm.jsx";

export default function Show({ post, auth }) {
    const user = auth.user ?? null;
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
                            return (
                                <div key={comment.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md mb-4">
                                    <div className="flex justify-between">
                                        <div className="text-xl font-bold">{comment.author.name}</div>
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-600">{parse(comment.body)}</div>
                                </div>
                            );
                        })}
                        {
                            !user ?
                                <div className="text-center">Login to leave comment</div>
                        : <AddCommentForm toPost={post}/>
                        }
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
