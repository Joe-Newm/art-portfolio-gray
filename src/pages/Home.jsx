import headerImage from "../assets/gray.jpg";


export default function Home() {


  return (
    <>
      <img src={headerImage} className="headerImage" />
      <div className="container mx-auto mt-10">
        <h1 className="mb-10 text-center"> Work </h1>
        <div className="columns-1 sm:columns-2 md:columns-3  gap-4 mb-10">
          <div className="bg-[#06373a]  h-50 mb-4"></div>
          <div className="bg-[#06373a]  h-150 mb-4"></div>
          <div className="bg-[#06373a]  h-150 mb-4"></div>
          <div className="bg-[#06373a]  h-100 mb-4"></div>
          <div className="bg-[#06373a]  h-50 mb-4"></div>
          <div className="bg-[#06373a]  h-50 mb-4"></div>
          <div className="bg-[#06373a]  h-50 mb-4"></div>
          <div className="bg-[#06373a]  h-50 mb-4"></div>
          <div className="bg-[#06373a]  h-50 mb-4"></div>
          <div className="bg-[#06373a]  h-50 mb-4"></div>
        </div>
      </div>
    </>
  )
}
