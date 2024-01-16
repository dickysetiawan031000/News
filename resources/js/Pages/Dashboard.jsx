import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Dashboard(props) {
    const successMessage = () => toast.success(props.flash.message);
    const errorMessage = () => toast.error(props.flash.message);

    useEffect(() => {
        if (props.flash.success) {
            successMessage();
        } else if (props.flash.success == false) {
            errorMessage();
        }

        if (!props.news) {
            Inertia.get('/news')
        }
        return;
    }, [props.flash])

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        category: '',
        desc: '',
    })

    function submit(e) {
        e.preventDefault()
        post(route('news.store'), {
            onSuccess: () => reset(),
        })
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-slate-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {errors.title && <div className="alert alert-error">{errors.title}</div>}
                    {errors.category && <div className="alert alert-error">{errors.category}</div>}
                    {errors.desc && <div className="alert alert-error">{errors.desc}</div>}

                    <form onSubmit={submit}>
                        <input type="text" placeholder="Title" className="m-2 input input-bordered w-full bg-white" onChange={e => setData('title', e.target.value)} value={data.title} />

                        <input type="text" placeholder="Category" className="m-2 input input-bordered w-full bg-white" onChange={e => setData('category', e.target.value)} value={data.category} />

                        <input type="text" placeholder="Description" className="m-2 input input-bordered w-full bg-white" onChange={e => setData('desc', e.target.value)} value={data.desc} />

                        <button className='btn btn-primary m-2 text-white' type='submit' disabled={processing}>
                            Submit
                        </button>
                    </form>
                </div>
                <div className="p-4">
                    {props.news && props.news.length > 0 ? props.news.map((data, i) => {
                        return (
                            <div key={i} className="card w-full lg:w-96 bg-base-100 shadow-xl m-3">
                                <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                                <div className="card-body bg-blue-100 text-black">
                                    <h2 className="card-title">
                                        {data.title}
                                        <div className="badge badge-secondary text-white">{data.category}</div>
                                    </h2>
                                    <p>{data.desc}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-inline">
                                            <Link href={route('news.edit', data.id)} as="button">
                                                Edit
                                            </Link>
                                        </div>
                                        <div className="badge badge-outline">
                                            <Link href={route('news.delete', data.id)} as='button' method='post'>
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p>You don't have news yet</p>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
