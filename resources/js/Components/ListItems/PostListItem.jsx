import parse from "html-react-parser";
import {TagItem} from "@/Components/ListItems/TagItem.jsx";
import {Link} from "@inertiajs/react";
import {preprocessBodyTeaser} from "@/utils.js";

export const PostListItem = ({post, className})  => {
   return (
       <div className={"border-b border-gray-400 flex p-3 " + className}>
           <div className={"pr-5 text-sm flex flex-col justify-center items-end min-w-[120px]"}>
               {
                   !post.solution_exists ?
                       <div>{post.comments_count} answers</div>
                       :
                       <div className={"text-green-950 border border-green-900 rounded bg-green-300 pr-2 pl-2 w-fit"}>✓ {post.comments_count} answers</div>
               }
           </div>
           <div className={"flex flex-col pl-3 w-full"}>
               <Link href={route('posts.show', post)} className={"text-xl font-medium leading-6 text-gray-900 dark:text-gray-100"}>{post.title}</Link>
               <div className={"text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 py-2"}>{preprocessBodyTeaser({body: post.body})}</div>
               <div className={"flex justify-between min-w-full gap-2"}>
                   <div className={"flex gap-2"}>
                       {
                           post.tags && post.tags.map((tag) => (
                               <TagItem key={tag.id} tag={tag}/>
                           ))
                       }
                   </div>
                   <div className={"truncate"}>
                       {post.author ? post.author.name : null}
                   </div>
               </div>
           </div>
       </div>
   );
}
