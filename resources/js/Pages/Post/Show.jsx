import {Link, Head, useForm} from '@inertiajs/react';
import DefaultLayout from "@/Layouts/DefaultLayout.jsx";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import parse from "html-react-parser";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {TagItem} from "@/Components/ListItems/TagItem.jsx";
import {CommentListItem} from "@/Components/ListItems/CommentListItem.jsx";
import CommentForm from "@/Pages/Post/Partials/CommentForm.jsx";

TimeAgo.addDefaultLocale(en)

export default function Show({ post, auth }) {
    const user = auth.user ?? null;
    const timeAgo = new TimeAgo('en-US')
    const canEdit = user && user.id === post.uid;
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
                <DefaultLayout.SidebarLayout>
                    <DefaultLayout.Main>
                        <div>
                            <div className={"flex flex-col gap-1 pb-4 border-b border-gray-400"}>
                                <div className={"flex justify-between"}>
                                    <h1 className={"text-3xl font-medium truncate"}>{post.title}</h1>
                                    <div className={"flex gap-3"}>
                                        {canEdit ? <PrimaryButton><Link href={route('posts.edit', post)}>Edit</Link></PrimaryButton> : null}
                                        {user ? <PrimaryButton><Link href={route('posts.create')}>Create own
                                            post</Link></PrimaryButton> : null}
                                    </div>
                                </div>
                                <div className={"flex gap-5 text-sm items-center"}>
                                    {solvedData.cid ? <div
                                        className={"text-green-700 dark:text-green-300 text-base"}>[Solved]</div> : null}
                                    <div>Asked: {timeAgo.format(Date.parse(post.created_at))}</div>
                                    <div>Modified: {timeAgo.format(Date.parse(post.updated_at))}</div>
                                </div>
                            </div>
                            <div className={"flex gap-1 py-4 border-b border-gray-400"}>
                                <div className={"pl-4 pr-[100px]"}>{parse(post.body)}</div>
                            </div>
                            <div className={"flex justify-between items-center w-full p-3"}>
                                <div className={"flex gap-1"}>
                                    {
                                        post.tags ? post.tags.map((tag) => (
                                            <TagItem key={tag.id} tag={tag}/>
                                        )) : null
                                    }
                                </div>
                                <div>
                                    Author: {post.author.name}
                                </div>
                            </div>
                            <div>
                               <div className={"text-2xl font-medium py-5"}>{post.comments.length} Answers: </div>
                                <div className={"flex flex-col gap-2"}>
                                    {
                                        post.comments.map((comment) => {
                                            if (editData.comment && editData.comment.id === comment.id) {
                                                return (
                                                    <>
                                                        <CommentForm key={comment.id} toPost={post} comment={comment} isUpdate={true} auth={auth}
                                                                     onUpdate={() => setData('comment', null)}/>
                                                    </>
                                                )
                                            } else {
                                                return (
                                                    <CommentListItem key={comment.id} comment={comment} user={user} isSolution={solvedData.cid === comment.id}
                                                                     openEdit={(comment) => setData('comment', comment)} markAsSolution={user.id === post.uid && !solvedData.cid ? (comment) => markAsSolved({comment}): null}/>
                                                )
                                            }
                                        })
                                    }
                                </div>
                                {
                                    user ?
                                        <>
                                            <div className={"text-xl font-medium py-5"}>Your answer: </div>
                                            <CommentForm toPost={post} auth={auth}/>
                                        </>
                                        : <div className={"p-4 text-center"}><Link className={"underline"} href={route('login')}>Login</Link> to leave comment.</div>
                                }
                            </div>
                        </div>
                    </DefaultLayout.Main>
                    <DefaultLayout.Sidebar>
                    </DefaultLayout.Sidebar>
                </DefaultLayout.SidebarLayout>
            </DefaultLayout>
        </>
    );
}
