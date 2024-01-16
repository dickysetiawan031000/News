import React from "react"; // import React
import { Head } from '@inertiajs/react';
import Navbar from "@/Components/Homepage/Navbar";
import NewsLists from "@/Components/Homepage/NewsList";
import Paginator from "@/Components/Homepage/Paginator";

export default function Homepage(props) {
    console.log("props", props);
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="flex justify-center flex-col items-center gap-4 p-4 lg:flex-row lg:flex-wrap lg:items-stretch">
                <NewsLists news={props.news.data} />
            </div>

            <div className="flex justify-center items-center">
                <Paginator meta={props.news.meta}/>
            </div>
        </div>
    );
}
