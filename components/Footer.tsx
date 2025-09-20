import Link from 'next/link';
import { FaSquareXTwitter, FaSquareInstagram, FaSquareWhatsapp, FaSquareYoutube } from "react-icons/fa6";
import { FaFacebookSquare, FaRedditSquare, FaTumblrSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import Image from "next/image";
import styles from './Footer.module.css';

const socialLinks = [
  { name: 'Instagram', icon: FaSquareInstagram, href: 'https://www.instagram.com/reskrow_ke/' },
  { name: 'Facebook', icon: FaFacebookSquare, href: 'https://www.facebook.com/profile.php?id=61566406644387' },
  { name: 'X (Twitter)', icon: FaSquareXTwitter, href: 'https://x.com/Reskrow' },
  { name: 'TikTok', icon: AiFillTikTok, href: 'https://www.tiktok.com/@reskrow.ke' },
  { name: 'WhatsApp', icon: FaSquareWhatsapp, href: 'https://wa.me/254715666140' },
  { name: 'YouTube', icon: FaSquareYoutube, href: 'http://www.youtube.com/@Reskrow-KE' },
  { name: 'Reddit', icon: FaRedditSquare , href: 'https://www.reddit.com/user/reskrow/' },
  { name: 'Tumblr', icon: FaTumblrSquare, href: 'https://www.tumblr.com/reskrow' },
]

export default function Footer() {
  return (
    <footer className="bg-blue-800 dark:bg-blue-950 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Reskrow Logo"
                width={150}
                height={50}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mb-4">Find your dream property with Reskrow Real Estate</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/properties" className={`hover: ${styles.fireLink}`}>Properties</Link></li>
              <li><Link href="/buy" className={`hover: ${styles.fireLink}`}>Buy</Link></li>
              <li><Link href="/rent" className={`hover: ${styles.fireLink}`}>Rent</Link></li>
              <li><Link href="/escrow" className={`hover: ${styles.fireLink}`}>Escrow Services</Link></li>
              <li><Link href="/pms" className={`hover: ${styles.fireLink}`}>Property Management Software (PMS)</Link></li>

            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/about" target="_blank" rel="noopener noreferrer" className={`hover: ${styles.fireLink}`}>About Us</Link></li>
              <li><Link href="/blog" target="_blank" rel="noopener noreferrer" className={`hover: ${styles.fireLink}`}>Blog</Link></li>
              <li><Link href="/faq" target="_blank" rel="noopener noreferrer" className={`hover: ${styles.fireLink}`}>FAQ</Link></li>
              <li><Link href="/contact" target="_blank" rel="noopener noreferrer" className={`hover: ${styles.fireLink}`}>Contact Us</Link></li>
              <li><Link href="/advertise" target="_blank" rel="noopener noreferrer" className={`hover: ${styles.fireLink}`}>Advertisements</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" target="_blank" rel="noopener noreferrer" className={`hover: ${styles.fireLink}`}>Terms of Service</Link></li>
              <li><Link href="/privacy" target="_blank" rel="noopener noreferrer" className={`hover: ${styles.fireLink}`}>Privacy Policy</Link></li>
              <li><Link href="/escrow-terms" target="_blank" rel="noopener noreferrer" className={`hover: ${styles.fireLink}`}>Escrow Terms</Link></li>
              <li><Link href="/disclaimer" target="_blank" rel="noopener noreferrer" className={`hover: ${styles.fireLink}`}>Disclaimer</Link></li>
              <li><Link href="/dispute-resolution" target="_blank" rel="noopener noreferrer" className={`hover: ${styles.fireLink}`}>Dispute Resolution</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-400 dark:border-blue-600">
          <h4 className="text-lg font-semibold mb-4">Connect with Us</h4>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center hover: ${styles.fireLink}`}
                >
                  <link.icon className={`w-5 h-5 mr-2 ${styles.fireIcon}`} />
                  <span className={`text-sm ${styles.fireText}`}>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Reskrow Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

