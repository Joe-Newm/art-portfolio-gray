import { Link } from "react-router-dom";

export default function Nav() {


  return (
    <nav class="align-center items-center">
      <div class="container mx-auto flex justify-between">
        <div>
          <Link to="/" class="text-[45px]">Gray Risinger</Link>
        </div>
        <div class="flex gap-4 items-center">
          <Link to="/">Work</Link>
          <Link to="/About">About</Link>
          <Link to="/Contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
