"use client";

import { Stack, Container, Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import CarouselCenterMode from 'src/components/carousel/carousel-center-mode';

const carousels = [
    {
        id: "1",
        title: "10 Essential Tips for Healthy Living",
        coverUrl: "/assets/images/landing/carousel1.png",
        description: "Sed ut mollitia tempore ipsam et illum doloribus ut. Occaecati ratione veritatis explicabo. Omnis nam omnis sunt placeat tempore accusantium placeat distinctio velit."
    },
    {
        id: "2",
        title: "Unveiling the Secrets of Successful Entrepreneurs",
        coverUrl: "/assets/images/landing/carousel2.png",
        description: "Eum illo dicta et perspiciatis ut blanditiis eos sequi. Ea veritatis aut et voluptas aut. Laborum eos quia tempore a culpa."
    },
    {
        id: "3",
        title: "The Art of Landscape Photography: Techniques and Inspiration",
        coverUrl: "/assets/images/landing/carousel3.png",
        description: "Aut quos quae dolores repudiandae similique perferendis perferendis earum laudantium. Facere placeat natus nobis. Eius vitae ullam dolorem."
    },
]

function Intro() {
    return (
        <>
            <Box
                sx={{
                    backgroundImage: "url('/assets/images/landing/farm3.png')",
                    height: "300px",
                    position: "absolute",
                    width: "100%",
                    left: "0",
                    backgroundColor: "#f8c32cd4",
                    backgroundBlendMode: "overlay"
                }}>

            </Box>
            <Container sx={{ mb: 10 }}>
                <Stack spacing={3}>
                    <Card sx={{ marginTop: "50px", backgroundColor: "transparent" }}>
                        {/* <CardHeader title="Carousel Center Mode" subheader="Customs shape & icon button" /> */}
                        <CardContent sx={{ padding: "0" }}>
                            <CarouselCenterMode data={carousels} />
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
        </>
    );
}

export default Intro
