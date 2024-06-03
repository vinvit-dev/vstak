import DefaultLayout from "@/Layouts/DefaultLayout.jsx";
import PostListItem from "@/Components/ListItems/PostListItem.jsx";

export default function Show({auth, user, posts}) {
   return(
       <DefaultLayout user={auth.user}>
           <DefaultLayout.SidebarLayout>
               <DefaultLayout.Sidebar>
                   <div className={"border rounded border-gray-300 p-4 flex flex-col gap-y-4"}>
                       <div
                           className={"w-[100px] h-[100px] bg-gray-500 rounded-full flex justify-center items-center"}>picture
                       </div>
                       <div>Username: {user.name}</div>
                       <div>Email: {user.email}</div>
                   </div>
               </DefaultLayout.Sidebar>
               <DefaultLayout.Main>
                   <h2>Last posts</h2>
                   {posts.map((post) => {
                       return (
                           <PostListItem post={post} key={post.id} />
                       );
                   })}
               </DefaultLayout.Main>
           </DefaultLayout.SidebarLayout>
       </DefaultLayout>
   );
}
