import { Box, Grid, Stack, Typography, Button, Container } from "@mui/material";
import { m } from "framer-motion";
import React from "react";
import Image from "src/components/image";
import { varBounce, MotionViewport } from "src/components/animate";
import { Icon } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const service_infos = [
	{ title: "Farm Address", content: "1 Cooke Road, Westcosnsin, United States" },
	{ title: "Contact Info", content: "info@farmhub.com" },
	{ title: "Working Hours", content: "Mon - Fri : 8,00am ~ 18,00pm" },
];

function UseCase() {
	return (
		<Container>
			<Stack
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				gap={3}
			>
				<Grid container spacing={6}>
					<Grid
						item
						xs={12}
						md={8}
						component={m.div}
					>
						<Stack>
							<Box sx={{
								mb: 2
							}}>
								<Box
									color="#236634"
									sx={{ backgroundColor: "#D3F0DB", borderRadius: "24px", padding: "4px 18px", display: "inline-block" }}
								>
									<Typography
										variant="body2"
										color="#236634"
									>
										With 30 years of experience
									</Typography>
								</Box>

							</Box>

							<Typography variant="h3" color="initial">
								Providing The Finest Products to the best feed Suppliers
							</Typography>
							<Typography variant="body1" color="initial">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod accusantium adipisci quos ratione cumque, quae blanditiis nostrum earum debitis vel omnis explicabo beatae ab molestias vero nemo perferendis magnam delectus.
							</Typography>
						</Stack>
					</Grid>
					<Grid
						item
						xs={12}
						md={4}
						component={m.div}
					>
						<Image
							alt="blob"
							src="/assets/images/landing/farm1.png"
						// width={300}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={6}>
					<Grid
						item
						xs={12}
						md={8}
						component={m.div}
					>
						<Box>
							<Button
								sx={{
									py: 0.7,
									px: 4,
									display: "inline-flex",
									fontWeight: "600",
									lineHeight: "18.23px",
									background: "#236634",
									borderRadius: "24px",
									mb: 2
								}}
								onClick={() => { }}
							>
								<Typography
									className="font-clash"
									variant="body1"
									letterSpacing={1}
									fontWeight={300}
									color="white"
								>
									See our services
								</Typography>
								<ArrowRightAltIcon sx={{ color: "white" }} />
							</Button>
							<Image
								alt="blob"
								src="/assets/images/landing/farm2.png"
							/>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={4}
						component={m.div}
					>
						<Stack
							justifyContent="space-around"
							sx={{ backgroundColor: "#F8C32C", height: "100%", borderRadius: "24px", padding: "12px" }}
						>
							{service_infos.map((info) => (
								<Stack
									key={info.title}
									flexDirection="row"
									alignItems="center"
								>
									<Box
										sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", backgroundColor: "#51310B", width: "50px", height: "50px", margin: "8px" }}
									>
										<LocationOnIcon fontSize="large" sx={{ fill: "white" }} />
									</Box>
									<Stack>
										<Typography variant="body1" color="initial">{info.title}</Typography>
										<Typography variant="caption" color="initial">{info.content}</Typography>
									</Stack>
								</Stack>
							))}
						</Stack>

					</Grid>
				</Grid>
			</Stack>
		</Container>
	);
}

export default UseCase;
