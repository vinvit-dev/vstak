import DefaultLayout from "@/Layouts/DefaultLayout.jsx";
import {Head} from "@inertiajs/react";
import PostListItem from "@/Components/ListItems/PostListItem.jsx";
import {Pager} from "@/Components/Pager.jsx";

export default function TagSearch({ posts, tag, auth }) {
    return (
        <>
    <DefaultLayout user={auth.user}>
        <Head title="Search" />
        <DefaultLayout.SidebarLayout>
            <DefaultLayout.Main>
                <h2 className={"text-3xl font-bold pb-3"}>Posts with tag: {tag.name}</h2>
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
            </DefaultLayout.Sidebar>
        </DefaultLayout.SidebarLayout>
    </DefaultLayout>
</>
    )
}
