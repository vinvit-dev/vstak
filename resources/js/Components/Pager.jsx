import {Link} from "@inertiajs/react";
import parse from "html-react-parser";

export const Pager = ({links, current_page, last_page}) => {
   return (
       <div className={"flex gap-1 justify-center"}>
           {
               last_page !== 1 && links.map((link, index) => {
                   if (index === 0 && current_page === 1) {
                       return;
                   }
                   if (index + 1 === links.length && current_page === last_page) {
                       return;
                   }
                       return (
                           <Link key={index} href={link.url}
                                 className={"border rounded p-1 text-sm border-gray-400" + (link.active ? "font-bold border-2" : "")}>{parse(link.label)}</Link>
                       );
                   }
               )
           }
       </div>
   )
}
