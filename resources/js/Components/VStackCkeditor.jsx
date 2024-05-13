import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputError from "@/Components/InputError.jsx";
import {render} from "react-dom";

export const VStackCkeditor = ({ onChange, value, error }) => {
    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => onChange({event, editor})}
            />
            <InputError message={error} className="mt-2"/>
        </>
    )
}
