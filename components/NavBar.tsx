"use client"

import Link from "next/link"
import Image from "next/image"
import posthog from "posthog-js"

const NavBar = () => {
    const handleLogoClick = () => {
        posthog.capture('logo_clicked', {
            destination: '/',
        })
    }

    const handleNavClick = (destination: string, label: string) => {
        posthog.capture('nav_link_clicked', {
            destination: destination,
            link_label: label,
        })
    }

    return (
        <header>
            <nav>
                <Link href="/" className="logo" onClick={handleLogoClick}>

                    <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
                    <p>DevEvent</p>

                </Link>
                <ul>
                    <li><Link href="/" onClick={() => handleNavClick('/', 'Home')}>Home</Link></li>
                    <li><Link href="/events" onClick={() => handleNavClick('/events', 'Events')}>Events</Link></li>
                    <li><Link href="/about" onClick={() => handleNavClick('/about', 'About')}>About</Link></li>
                    <li><Link href="/contact" onClick={() => handleNavClick('/contact', 'Contact')}>Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar