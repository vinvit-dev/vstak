import AsyncCreatableSelect from "react-select/async-creatable";
import AsyncSelect from "react-select/async";
import axios from "axios";
import {router} from "@inertiajs/core";

export const SearchInput = ({className = ''}) => {

    const searchTags = (inputValue) => {
        return axios.post(route('posts.search'), {
            q: inputValue
        }).then((response) => {
            console.log(response.data);
            return response.data.map((post) => {
                return {
                    value: post.id,
                    label: post.title
                }
            });
        });
    }
    console.log(router)
    return (
       <div className={className}>
           <AsyncSelect
               cacheOptions
               loadOptions={searchTags}
               onChange={(tag) => router.replace(route('posts.show', tag.value))}
               value={''}
               placeholder={"Search..."}
           />
       </div>
    )
};
