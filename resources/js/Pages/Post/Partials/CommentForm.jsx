import {useForm} from "@inertiajs/react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function CommentForm({toPost, comment = null, isUpdate = false, onUpdate, ...props}) {
    const {data, setData, post, put, processing, errors} = useForm({
        body: comment ? comment.body : '',
        pid: toPost.id,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (isUpdate) {
            put(route('comments.update', comment), {
                preserveScroll: true,
                onSuccess: () => {
                    onUpdate();
                }
            });
        } else {
            post(route('comments.store'), {
                data: data,
                preserveScroll: true,
                onSuccess: () => {
                    setData('body', '');
                }
            });
        }
    };

    return (
       <div {...props}>
           <form onSubmit={onSubmit}>
               <CKEditor
                   editor={ClassicEditor}
                   data={data.body}
                   onChange={(event, editor) => {
                       setData('body', editor.getData());
                   }}
               />
               <InputError message={errors.body} className="mt-2"/>
               <div className="flex justify-end mb-6">
                   <PrimaryButton className="mt-2" disabled={processing}>
                       {isUpdate
                           ?
                           'Update'
                           :
                           'Send'
                       }
                   </PrimaryButton>
               </div>
           </form>
       </div>
    );
}
