import React from "react";
import Image, { StaticImageData } from "next/image";
import image1 from "@/public/MeetTeam (1).jpg";
import image2 from "@/public/MeetTeam (2).jpg";
import image3 from "@/public/MeetTeam (3).jpg";
import image4 from "@/public/MeetTeam (4).jpg";
import image5 from "@/public/MeetTeam (5).jpg";
import image6 from "@/public/MeetTeam (6).jpg";
import image7 from "@/public/MeetTeam (7).jpg";
import image8 from "@/public/MeetTeam (8).jpg";
import image9 from "@/public/MeetTeam (9).jpg";

const teamImages = [
    { src: image1, name: "Member 1" },
    { src: image4, name: "Member 2" },
    { src: image6, name: "Member 3" },
    { src: image2, name: "Member 4" },
    { src: image5, name: "Member 5" },
    { src: image3, name: "Member 6" },
    { src: image7, name: "Member 7" },
    { src: image8, name: "Member 8" },
];

const MeetOurTeam = () => (
    <section style={{ textAlign: "center", margin: "48px 0" }}>
        <h2 className="text-center font-normal text-3xl md:text-5xl leading-tight tracking-wide text-[#1E437A] mb-8">
            Meet the Team
        </h2>

        {/* First image at the center */}
        <div style={{ display: "flex", justifyContent: "center", margin: "40px 0" }}>
            <TeamMember {...teamImages[0]} large />
        </div>

        {/* Remaining images */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {chunkArray(teamImages.slice(1), 2).map((row: any, index: any) => (
                <div
                    key={index}
                    className="flex justify-center gap-8 sm:gap-20 flex-col sm:flex-row"
                >
                    {row.map((member: any, idx: any) => (
                        <div key={idx} className="flex justify-center">
                            <TeamMember {...member} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </section>
);

type TeamMemberProps = {
    src: StaticImageData;
    name: string;
    large?: boolean;
};

const TeamMember = ({ src, name, large }: TeamMemberProps) => (
    <div style={{ textAlign: "center" }}>
        <Image
            src={src}
            alt={name}
            width={large ? 560 : 280}
            height={large ? 360 : 220}
            style={{
                borderRadius: "12px",
                objectFit: "cover",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            }}
        />
        <div
            style={{
                marginTop: 14,
                fontWeight: 600,
                fontSize: "18px",
                color: "#1E437A",
            }}
        >
            {/* {name} */}
        </div>
    </div>
);

// Helper function → Split into rows of 2
const chunkArray = (array: any[], size: number) => {
    return array.reduce((acc, _, i) => {
        if (i % size === 0) acc.push(array.slice(i, i + size));
        return acc;
    }, [] as any[][]);
};

export default MeetOurTeam;
