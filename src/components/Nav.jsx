import { Link } from "react-router-dom";

export default function Nav() {


  return (
    <nav class="align-center items-center">
      <div class="container mx-auto flex justify-between">
        <div>
          <Link to="/" class="text-[45px]">Gray Risinger</Link>
        </div>
        <div class="flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
        </div>
      </div>
    </nav>
  );
}
