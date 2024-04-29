import {useForm} from "@inertiajs/react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function AddCommentForm({toPost}) {
    const {data, setData, post, processing, errors} = useForm({
        body: '',
        pid: toPost.id,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('comments.store'), {
            data: data,
            preserveScroll: true,
            onSuccess: () => {
                setData('body', '');
            }
        });
    };

    return (
       <div>
           <form onSubmit={onSubmit}>
               <CKEditor
                   editor={ClassicEditor}
                   data={data.body}
                   onChange={(event, editor) => {
                       setData('body', editor.getData());
                   }}
               />
               <InputError message={errors.body} className="mt-2"/>
               <div className="flex justify-end">
                   <PrimaryButton className="mt-2" disabled={processing}>Send</PrimaryButton>
               </div>
           </form>
       </div>
    );
}
