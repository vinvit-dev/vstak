import InputError from "@/Components/InputError.jsx";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "@/ckeditor_customization.js";

export const VStackCkeditor = ({ onChange, value, error = null, auth }) => {
    Editor.defaultConfig.ckfinder.uploadUrl = route('file.upload', {"_token": auth.csrf_token});
    console.log(error);
    return (
        <>
            <CKEditor
                editor={Editor}
                data={value}
                onChange={(event, editor) => onChange({event, editor})}
            />
            <InputError message={error} className="mt-2 text-black"/>
        </>
    )
}
