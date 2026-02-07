import Link from "next/link";

const MetaNav = () => {
    return (
        <div className="bg-primary text-primary-foreground py-1 text-xs border-b border-primary-foreground/10 hidden md:block">
            <div className="section-container flex justify-center gap-4 font-secondary">
                <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:underline">IEEE.org</a>
                <a href="https://ieeexplore.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:underline">IEEE Xplore Digital Library</a>
                <a href="https://standards.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:underline">IEEE Standards</a>
                <a href="https://spectrum.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:underline">IEEE Spectrum</a>
                <a href="https://www.ieee.org/sitemap.html" target="_blank" rel="noopener noreferrer" className="hover:underline">More Sites</a>
            </div>
        </div>
    );
};

export default MetaNav;
