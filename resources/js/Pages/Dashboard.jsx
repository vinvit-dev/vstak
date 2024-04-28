import {Head, Link} from '@inertiajs/react';
import DefaultLayout from "@/Layouts/DefaultLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import parse from 'html-react-parser';

export default function Dashboard({ posts, auth }) {
    return (
        <DefaultLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div>
                <div className="flex justify-between p-10">
                    <h2 className="text-3xl font-bold">Your posts</h2>
                    <PrimaryButton >
                        <Link href={route('posts.create')}>Create post</Link>
                    </PrimaryButton>
                </div>
                {posts.data.map(post => {
                    return (
                        <div key={post.id}
                             className="p-4 border border-gray-200 dark:border-gray-700 rounded-md mb-4">
                            <div className="flex justify-between">
                                <Link href={route('posts.show', post)} className="text-xl font-bold">{post.title}</Link>
                                {
                                    post.uid === auth.user.id
                                        ? <PrimaryButton><Link href={route("posts.edit", post)}>Edit</Link></PrimaryButton>
                                        : null
                                }
                            </div>
                            <div>{parse(post.body.slice(0, 256))}</div>
                        </div>
                    );
                })}
                {
                    posts.data.length > 5 ?
                    <div className="flex justify-center">
                        {posts.links.map((link, index) => {
                            return (
                                <Link key={index} href={link.url}
                                      className="p-2 border border-gray-200 dark:border-gray-700 rounded-md mx-1">
                                    {decodeURI(link.label)}
                                </Link>
                            );
                        })}
                    </div>
                        : null
                }
            </div>
        </DefaultLayout>
    );
}
