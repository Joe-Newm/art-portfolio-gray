import headerImage from "../assets/gray.jpg";


export default function Home() {


  return (
    <>
      <img src={headerImage} class="headerImage" />
      <div class="container mx-auto mt-10">
        <h1 class="mb-10 text-center"> Work </h1>
        <div class="columns-1 sm:columns-2 md:columns-3  gap-4 mb-10">
          <div class="bg-[#06373a]  h-50 mb-4"></div>
          <div class="bg-[#06373a]  h-150 mb-4"></div>
          <div class="bg-[#06373a]  h-150 mb-4"></div>
          <div class="bg-[#06373a]  h-100 mb-4"></div>
          <div class="bg-[#06373a]  h-50 mb-4"></div>
          <div class="bg-[#06373a]  h-50 mb-4"></div>
          <div class="bg-[#06373a]  h-50 mb-4"></div>
          <div class="bg-[#06373a]  h-50 mb-4"></div>
          <div class="bg-[#06373a]  h-50 mb-4"></div>
          <div class="bg-[#06373a]  h-50 mb-4"></div>
        </div>
      </div>
    </>
  )
}
