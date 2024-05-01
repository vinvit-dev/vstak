import {Head, useForm} from '@inertiajs/react';
import DefaultLayout from "@/Layouts/DefaultLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import AsyncCreatableSelect from "react-select/async-creatable";

export default function Edit({post, auth}) {
    console.log(post);

    const { data, setData, put, delete: destroy, processing, errors, reset} = useForm({
        title: post.title,
        body: post.body,
        tags: post.tags.map((tag) => {
            return {
                value: tag.id,
                label: tag.name
            }
        }),
    });

    const deletePost = (e) => {
        e.preventDefault();

        // put(route('posts.destroy', post), {_method: 'DELETE'});
        destroy(route('posts.destroy', post));
    }

    const submit = (e) => {
        e.preventDefault();
        put(route('posts.update', post));
    };

    const searchTags = (inputValue) => {
        return axios.post(route('tags.search'), {
            query: inputValue
        }).then((response) => {
            return response.data.map((tag) => {
                return {
                    value: tag.id,
                    label: tag.name + ' (' + tag.entries_count + ')',
                }
            });
        });
    }

    const createTag = (inputValue) => {
        axios.post(route('tags.store'), {
            name: inputValue
        }).then((response) => {
            const tag = {
                value: response.data.id,
                label: response.data.name
            }
            setData('tags', [...data.tags, tag]);
        });
    }

    return (
        <>
            <Head title="Edit post"/>
            <DefaultLayout user={auth.user}>
                <div className="">
                    <h2 className="text-4xl text-center font-bold pb-2">Edit post</h2>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="title" value="Title"/>

                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('title', e.target.value)}
                            />

                            <InputError message={errors.title} className="mt-2"/>
                        </div>

                        <div>
                            <InputLabel htmlFor="tags" value="Tags"/>

                            <AsyncCreatableSelect
                                isMulti
                                isClearable
                                cacheOptions
                                onCreateOption={createTag}
                                loadOptions={searchTags}
                                onChange={(tags) => setData('tags', tags)}
                                value={data.tags}
                            />
                            <InputError message={errors.title} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <CKEditor
                                editor={ClassicEditor}
                                data={data.body}
                                onChange={(event, editor) => {
                                    setData('body', editor.getData());
                                }}
                            />
                            <InputError message={errors.body} className="mt-2"/>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton onClick={deletePost} className="ms-4 dark:bg-red-600 dark:text-white"
                                           disabled={processing}>
                                Delete
                            </PrimaryButton>
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Save
                            </PrimaryButton>
                        </div>

                    </form>
                </div>
            </DefaultLayout>
        </>
    );
}
