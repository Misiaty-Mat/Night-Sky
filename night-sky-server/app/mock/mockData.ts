import { Sky } from "@prisma/client";
import prisma from "../prismaConfig";

const mockDatabase = async () => {
    const allSkies: Sky[] = await prisma.sky.findMany();
    if (allSkies.length === 0) {
        const newSky: Sky = await prisma.sky.create({
            data: {
                cloudLevel: 5,
                moonPhase: "Full",
                rainType: "Snow",
                fogLevel: 1,
                constellations: {
                    create: [{
                            name: "Andromeda",
                            description: "The Chained maiden",
                            imgLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.planetguide.net%2Fwp-content%2Fuploads%2F2021%2F05%2FDepositphotos_278313078_s-2019.jpg&f=1&nofb=1&ipt=80acb2af6f02abd905fcf945ab1c237ecedcbef85be0c752f193e2447b97069b&ipo=images",
                            stars: {
                                create: [{
                                    name: "Nembus",
                                    description: "A giant star in the constellation of Andromeda.",
                                    imgLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftheskylive.com%2Fsky%2Fstars%2Fstar-images%2F4%2F464_800.jpg&f=1&nofb=1&ipt=5cbe0f7d5f08075024d07e032920875d4492cecb9e552575027f58474bf0bb4c&ipo=images"
                                },
                                {
                                    name: "Almach",
                                    description: "A bright giant star in the constellation of Andromeda.",
                                    imgLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Feyesonthesky.com%2Fuploads%2F8f587e74-fb0e-4a34-bdcc-fcc0cfe03c0c.jpg&f=1&nofb=1&ipt=0b27c272b02a178b5a3acccab7320eb52629ff88e339021fef8db5cdbaf72991&ipo=images"
                                },
                            ]
                            }
                        },
                        {
                            name: "Taurus",
                            description: "The Bull",
                            imgLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.mos.cms.futurecdn.net%2FzNQVpUJy2JH9Q2zpwTyo8J.jpg&f=1&nofb=1&ipt=40e09b97765cd21337fd6183926a7fc33cd7908207e82f42f3ba1b6908c570c8&ipo=images",
                            stars: {
                                create: [{
                                    name: "Elnath",
                                    description: "26th brightest star in the sky",
                                    imgLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fin-the-sky.org%2Fimage.php%3Fstyle%3Dhugeteaser%26userimg%3D19910715_115943_3199299f9b60.png&f=1&nofb=1&ipt=c53ba6f8dc025438592490625a195f6fb37cd32368317f5cff89fec79cea1d36&ipo=images"
                                },
                                {
                                    name: "Atlas",
                                    description: "Easily visible from locations with dark skies",
                                    imgLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fin-the-sky.org%2Fimage.php%3Fstyle%3Dhugeteaser%26userimg%3D19910715_115923_136a23d2ceb8.png&f=1&nofb=1&ipt=3a4145e6f52b4171bfecc3dc9fdd831810393d76907fd1890e0e9ff026f84068&ipo=images"
                                }]
                            }
                        }
                    ]
                }
            }
        })

        console.dir(newSky, {depth: null})
    } else {
        console.log("Mocked data ready")
    }
}

export default mockDatabase;