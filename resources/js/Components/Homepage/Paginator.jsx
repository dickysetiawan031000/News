import { Link } from "@inertiajs/react"

const Paginator = ({ meta }) => {
    const prev = meta.links[0].url //Menganbil url dari array pertama
    const next = meta.links[meta.links.length - 1].url //Mengambil url dari array terakhir
    const current = meta.current_page //Mengambil current page

    return (
        <div className="join">
            {/* jika ada prev maka munculkan button */}
            {prev && <Link href={prev} className="join-item btn">«</Link>}

            <button className="join-item btn">{current}</button>

            {/* jika ada next maka munculkan button */}
            {next && <Link href={next} className="join-item btn">»</Link>}
        </div>
    )
}

export default Paginator
