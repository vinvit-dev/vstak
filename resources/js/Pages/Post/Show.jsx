import { Link, Head } from '@inertiajs/react';
import DefaultLayout from "@/Layouts/DefaultLayout.jsx";
import parse from "html-react-parser";

export default function Show({ post, auth }) {
    console.log(post);

    return (
        <>
            <Head title={post.title}/>
            <DefaultLayout user={auth.user}>
                <div className="flex justify-center">
                    <div className="p-4 mb-4 w-3/4">
                        <h2 className="text-4xl text-center font-bold pb-2">{post.title}</h2>
                        <p className="text-gray-500 dark:text-gray-600 pb-4 text-center">{post.author.name}</p>
                        <p className="w-3/4 mx-auto">{parse(post.body)}</p>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
