import React from "react";
import StarsBackground from "@/Components/backgrounds/stars";
import { cn } from "@/lib/utils";
import { PageLayout } from "@/Layouts/PageLayout";

export default function Dashboard({ auth }) {
    const user = auth?.user;
    const breadcrumbs = [{ label: "Main Menu", href: "#" }];

    return (
        <PageLayout user={user} breadcrumbs={breadcrumbs}>
            {/* Container to hold bg + content */}
            <div className="relative min-h-full w-full rounded-xl overflow-hidden">
                {/* 🌌 Starry background */}
                <StarsBackground
                    starColor="#ffffff"
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-xl",
                        // Midnight gradient
                        "dark:bg-[radial-gradient(ellipse_at_bottom,_#ffffff_0%,_#0a192f_60%,_#000000_100%)]",
                        "bg-[radial-gradient(ellipse_at_bottom,_#dbeafe_0%,_#1e3a8a_0%,_#0f172a_100%)]",
                        "text-black dark:text-white"
                    )}
                >
                    {/* 🌟 Centered content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4">
                        {/* 🔹 Logo placeholder */}
                        <img
                            src="/PITON LOGO.png"
                            alt="PITON Logo"
                            className="w-32 h-32 object-contain drop-shadow-lg"
                        />

                        {/* 🔹 Title text */}
                        <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.7)] tracking-wide text-center font-sans">
                            Philippine Information Technology of the North
                        </h1>

                        {/* 🔹 Subtitle placeholder */}
                        <p className="text-sm md:text-base text-gray-200 italic">
                            — Coding Our Future —
                        </p>
                    </div>
                </StarsBackground>
            </div>
        </PageLayout>
    );
}
