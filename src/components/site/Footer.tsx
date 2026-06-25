import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-12 md:py-16 grid gap-10 md:grid-cols-3">
                <div>
                    <div className="flex items-center gap-2.5">
                        <Image
                            src="/TCA.png"
                            alt="Trimurti Cement Article"
                            width={50}
                            height={50}
                            className="object-contain"
                        />
                        <span className="font-mono text-[11px] tracking-[0.18em] uppercase">
                            Trimurti
                            <br />
                            <span className="text-muted-foreground">Cement Article</span>
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground max-w-xs">
                        RCC Precast Compound Walls, Security Cabins, Precast Rooms, Fencing Systems &  Ready-Made Structures.
                    </p>
                    <div className="mt-4 text-lg ">
                        A Concept of 21st Century.
                    </div>
                </div>

                <div>
                    <div className="eyebrow mt-8">Visit</div>
                    <a
                        href="https://maps.app.goo.gl/tjE9apGDKis9LqQW7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-3 text-sm text-foreground/85 max-w-xs hover:text-highlight transition-colors"
                    >
                        Khasra No 266, Near Luharli Toll Plaza,
                        <br />
                        Luharli Village, Dist. Gautam Buddh Nagar
                        <br />
                        Dadri – 203207, Uttar Pradesh
                    </a>
                </div>

                <div>
                    <div className="eyebrow mt-8">Contact</div>
                    <ul className="mt-3 space-y-1.5 text-sm">
                        <li><a href="tel:+919723226674" className="hover:text-highlight">+91 97232 26674</a></li>
                        <li><a href="tel:+918000340405" className="hover:text-highlight">+91 80003 40405</a></li>
                        <li><a href="mailto:trimurticementarticle@gmail.com" className="hover:text-highlight">trimurticementarticle@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-border">
                <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-center gap-2 font-mono text-[13px] tracking-[0.22em] uppercase text-muted-foreground">
                    <div> ⓒ{new Date().getFullYear()} Trimurti Cement Article · All rights reserved</div>

                </div>
            </div>
        </footer>
    );
}