import { Link } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function Footer() {


  return (
    <footer className="bg-[#06373a] h-32 bottom-0 flex flex-col items-center justify-center pb-6 pt-4">
      <Link to="/" className="text-[45px] font-serif text-white">Gray Risinger</Link>
      <div className="flex gap-4">
      <InstagramIcon sx={{fontSize: 34 ,color: "white"}} />
      <MailOutlineIcon sx={{fontSize: 34 ,color: "white"}} />
      </div>
    </footer>
  )
}
