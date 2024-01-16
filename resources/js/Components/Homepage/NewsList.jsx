const isNews = (news) => {
    return news.map((data, i) => {
        return (
            <div key={i} className="card w-full lg:w-96 bg-base-100 shadow-xl">
                <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body bg-blue-100 text-black">
                    <h2 className="card-title">
                        {data.title}
                        <div className="badge badge-secondary text-white">{data.category}</div>
                    </h2>
                    <p>{data.desc}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-inline">{data.category}</div>
                        <div className="badge badge-outline">{data.author}</div>
                    </div>
                </div>
            </div>
        )
    })
}

const isNotNews = () => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">
                    No News
                </h2>
                <p>There is no news to display</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
    )
}

const NewsLists = ({ news }) => {
    return !news ? isNotNews() : isNews(news)
}

export default NewsLists
