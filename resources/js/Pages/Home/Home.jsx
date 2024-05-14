import DefaultLayout from "@/Layouts/DefaultLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {PostListItem} from "@/Components/ListItems/PostListItem.jsx";
import {Pager} from "@/Components/Pager.jsx";
import {router} from "@inertiajs/core";

export default function Home({ posts, users, post_count, solved_post_count, auth}) {

    const getQueryParam = (name) => new URLSearchParams(window.location.search).get(name);
    const filterLink = 'px-3 py-1 hover:bg-gray-700 rounded';
    return (
        <>
            <Head title="Home" />
            <DefaultLayout user={auth.user}>
                <DefaultLayout.SidebarLayout>
                    <DefaultLayout.Main>
                        <div className={"flex justify-between"}>
                            <h2 className={"text-3xl font-bold pb-3"}>Posts: </h2>
                            <div className={"flex border rounded border-gray-400 h-fit"}>
                                <Link href={route('home', {"filter": 'all'})} className={filterLink + (getQueryParam('filter') === 'all' || !getQueryParam('filter')  ? " bg-gray-600" : "")}>All</Link>
                                <Link href={route('home', {"filter": 'solved'})} className={filterLink + (getQueryParam('filter') === 'solved' ? " bg-gray-600" : "")}>Solved</Link>
                                <Link href={route('home', {"filter": 'unsolved'})} className={filterLink + (getQueryParam('filter') === 'unsolved' ? " bg-gray-600" : "")}>Unsolved</Link>
                            </div>
                        </div>
                        {
                            posts && posts.data.map((post) => (
                                <div key={post.id} className={"pb-4"}>
                                    <PostListItem post={post} />
                                </div>
                            ))
                        }
                        <Pager links={posts.links} current_page={posts.current_page} last_page={posts.last_page}/>
                    </DefaultLayout.Main>
                    <DefaultLayout.Sidebar>
                        <h2 className={"text-2xl font-bold pb-3"}>Top users: </h2>
                        <div className={"border rounded border-gray-400"}>
                            {
                                users && users.map((user, index) => (
                                    <div key={user.id} className={"p-2" + (index !== users.length - 1 ? " border-b" : "")}>
                                        <p>{user.name}<span
                                            className={"text-sm text-gray-600"}> ({user.points} points)</span></p>
                                    </div>
                                ))
                            }
                        </div>

                        <h2 className={"text-2xl font-bold pb-3 pt-5"}>Statistic: </h2>
                        <div className={"border rounded border-gray-400"}>
                            <div className={"p-2 border-b"}>
                                <p>Total posts: {post_count}</p>
                            </div>
                            <div className={"p-2 border-b"}>
                                <p>Solved posts: {solved_post_count}</p>
                            </div>
                            <div className={"p-2"}>
                                <p>Solved Percentage: { parseFloat(solved_post_count / post_count * 100).toFixed(2)}%</p>
                            </div>
                        </div>
                    </DefaultLayout.Sidebar>
                </DefaultLayout.SidebarLayout>
            </DefaultLayout>
        </>
    );
}
