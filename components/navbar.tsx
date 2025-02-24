import Link from "next/link";

const navigation = [
    { name: "home", href: "/" },
    { name: "about", href: "/about" },
    { name: "tech stack", href: "/techstack" },
    { name: "demos", href: "/demos" },
    
];

export default function Navbar() {
    return (
        <nav className="pt-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
    ); 
}