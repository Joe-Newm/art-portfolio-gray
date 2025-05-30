import portrait from "../assets/gray-small.jpg"

export default function About() {


  return (
    <div className="container mx-auto mt-10 max-w-200 pl-4 pr-4">
      <div className="justify-center w-auto">
        <h1 className=" border-b-2  mt-20 mb-10"> About </h1>
      </div>
      <div className="flex flex-col mb-24 gap-6 md:flex-row">
        <img src={portrait} alt="portrait of Gray Risinger" className="w-60"></img>
        
      <div>
        <h2 className="mb-6">Hi, I'm Gray Risinger</h2>
        <p>I'm a local artist from West Monroe, Louisiana. I create scenic and abstract paintings inspired by the landscapes and atmosphere of my home in Northeast Louisiana.

My work ranges from calm, detailed views of nature to bold, expressive abstract pieces. Whether I’m capturing a peaceful lakeside morning or experimenting with color and texture, each painting reflects both the world around me and the emotions behind it.

Thank you for visiting — feel free to reach out if you're interested in a piece, have a question, or just want to connect.</p>
      </div>

      </div>
    </div>
  );
}
