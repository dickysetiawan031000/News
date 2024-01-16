import React, { useEffect } from "react"; // import React
import { Head, useForm } from '@inertiajs/react';
import Navbar from "@/Components/Homepage/Navbar";
import toast, { Toaster } from "react-hot-toast";

export default function EditNews(props) {
    console.log("props edit", props);

    const successMessage = () => toast.success(props.flash.message);
    const errorMessage = () => toast.error(props.flash.message);

    console.log("flash", props.flash);
    useEffect(() => {
        if (props.flash.success == true) {
            successMessage();
        } else if (props.flash.success == false) {
            errorMessage();
        }
    }, [props.flash])

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        category: '',
        desc: '',
    })

    function submit(e) {
        e.preventDefault()
        post(route('news.update', props.news.id), {
            onSuccess: () => reset(),
        })
    }
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />

            <div className="card w-full lg:w-96 bg-base-100 shadow-xl m-3">
                <div className="card-body bg-blue-100 text-black">
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <form onSubmit={submit}>
                        <input type="text" placeholder="Title" className="m-2 input input-bordered w-full bg-white" onChange={e => setData('title', e.target.value)} defaultValue={props.news.title} />

                        <input type="text" placeholder="Category" className="m-2 input input-bordered w-full bg-white" onChange={e => setData('category', e.target.value)} defaultValue={props.news.category} />

                        <input type="text" placeholder="Description" className="m-2 input input-bordered w-full bg-white" onChange={e => setData('desc', e.target.value)} defaultValue={props.news.desc} />

                        <button className='btn btn-primary m-2 text-white' type='submit' disabled={processing}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
