
export default function EditModal({ postid, postName, postDesc, isOpen, setIsOpen }) {



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl text-center w-xl h-auto">
        <h2 className="text-xl font-bold mb-4">{postName}</h2>
        <p>{postDesc}</p>
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>

  )
}
