import {mainTextColor} from "@/variables.js";

export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm` + mainTextColor + " " + className}>
            {value ? value : children}
        </label>
    );
}
