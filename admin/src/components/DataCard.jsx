import { useNavigate } from "react-router-dom"

function DataCard({ nama, alamat, latitude, longitude, index, id }) {
    const navigate = useNavigate();
    return (
        <div className='flex justify-between bg-default-100 rounded-md mt-5'>
            <div className='w-[10%] min-h-29'>
                <button className='py-1 px-3 bg-default-200 w-full h-full rounded-l-md text-lg'>
                    {index}
                </button>
            </div>
            <div className='p-5 w-[70%]'>
                <h1 className='text-medium font-bold '>{nama}</h1>
                <div className='mt-2 text-small'>
                    <p>{alamat}</p>
                    <p className="mt-2 text-primary">{latitude}, {longitude}</p>
                </div>
            </div>
            <div className='w-[20%] min-h-29'>
                <button className='py-1 px-3 bg-primary w-full h-full rounded-r-md hover:cursor-pointer hover:opacity-75' onClick={() => navigate(`/dashboard/data/${id}`)}>
                    Info
                </button>
            </div>
        </div>
    )
}

export default DataCard