import {Link, Head, router} from '@inertiajs/react';
import DefaultLayout from "@/Layouts/DefaultLayout.jsx";
import parse from "html-react-parser";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Home({ posts, users, post_count, solved_post_count, auth}) {

    return (
        <>
            <Head title="Home" />
            <DefaultLayout user={auth.user}>
                <div className="flex gap-x-10">
                    <div className="w-3/4">
                        <h2 className="font-bold text-3xl pb-3">Posts</h2>
                        {posts.data.map(post => {
                            return (
                                <div key={post.id}
                                     className="p-4 border border-gray-200 dark:border-gray-700 rounded-md mb-4">
                                    <div className="flex items-center gap-2">
                                        {post.solution_exists ?
                                            <span className="text-green-500 font-bold">[SOLVED]</span> : null}
                                        <Link href={route('posts.show', post)}
                                              className="text-xl font-bold">{post.title}</Link>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-600">{post.author.name}</p>
                                    <div>{parse(post.body.slice(0, 256))}</div>
                                    <div className="flex items-center gap-2">
                                        <div>Tags:</div>
                                        {
                                            post.tags.map(tag => {
                                                return (
                                                    <div
                                                        className="border border-gray-400 p-1 w-min rounded-md">{tag.name}</div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })}
                        <div className="flex justify-center">
                            {posts.links.map((link, index) => {
                                return (
                                    <Link key={index} href={link.url}
                                          className="p-2 border border-gray-200 dark:border-gray-700 rounded-md mx-1">
                                        {parse(link.label)}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-1/4">
                        <h2 className="font-bold text-3xl pb-4">Top users</h2>
                        {users.map(user => {
                            return (
                                <div key={user.id} className="flex items-center gap-x-3 w-full">
                                    <div
                                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-md mb-4 w-full">
                                        <Link className="font-bold">{user.name} - Points: {user.points}</Link>
                                        <p className="text-gray-500 dark:text-gray-600">{user.email}</p>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="font-bold text-xl">Total posts: {post_count}</div>
                        <div className="font-bold text-xl">Solved posts: {solved_post_count}</div>
                        <div className="font-bold text-xl">Percent solved posts: {parseFloat(solved_post_count * 100 / post_count).toFixed(2)}%</div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
