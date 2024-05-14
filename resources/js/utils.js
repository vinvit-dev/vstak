import {stripHtml} from "string-strip-html";

export const preprocessBodyTeaser = ({body, length = 172}) => {
   return stripHtml(body).result.substring(0, length) + (body.length > length ? "..." : "");
}
