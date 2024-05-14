import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {VStackCkeditor} from "@/Components/VStackCkeditor.jsx";

export default function CommentForm({toPost, comment = null, isUpdate = false, onUpdate, auth, ...props}) {
    const {data, setData, setError, post, put, processing, errors} = useForm({
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
                },
                onError: (response) => {
                    setError('body', response.body);
                }
            });
        } else {
            post(route('comments.store'), {
                data: data,
                preserveScroll: true,
                onSuccess: () => {
                    setData('body', '');
                },
                onError: (response) => {
                    setError('body', response.body);
                }
            });
        }
    };

    return (
       <div {...props}>
           <form onSubmit={onSubmit}>
               <VStackCkeditor
                   value={data.body}
                   onChange={({editor}) => setData('body', editor.getData())}
                   error={errors.body}
                   auth={auth}
               />
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
