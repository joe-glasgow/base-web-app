import Head from 'next/head'
import {Inter, Bungee} from '@next/font/google'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Item from "@mui/material/Paper"
import Grid from "@mui/material/Grid"

const interLarge = Inter({subsets: ['latin'], weight: '600', fallback: ["sans-serif"]});
const interRegular = Inter({subsets: ['latin'], weight: '300', fallback: ["sans-serif"]});
const bungeeLarge = Bungee({subsets: ['latin'], weight: '400', fallback: ["sans-serif"]})

export default function Home() {

    const containerStyles = {maxWidth: "1200px", margin: "0 auto"}
    const itemStyle = {boxShadow: "none"}
    const cardStyle = {borderRadius: "0", ...itemStyle}

    return (
        <>
            <Head>
                <title>Base Web App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main style={containerStyles}>
                <Card sx={cardStyle}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Item sx={itemStyle}>
                                <Grid margin={0} container spacing={2}>
                                    <Grid sx={{padding: "0 !important"}} margin={0} item justifyContent="left"
                                          alignItems="center" display="flex" xs={2}>
                                        <Item sx={itemStyle}><Typography sx={{color: "#13a40e", letterSpacing: "-8px"}}
                                                                         className={bungeeLarge.className} variant="h2"
                                                                         component="span">BWA</Typography></Item>
                                    </Grid>
                                    <Grid sx={{padding: "0 !important"}} padding={0} margin={0} item
                                          justifyContent="start" alignItems="center" display="flex" xs={10}>
                                        <Item sx={itemStyle}><Typography className={interLarge.className} component="h1"
                                                                         variant="h3">Base Web App</Typography></Item>
                                    </Grid>
                                </Grid>
                            </Item>
                            <Item sx={itemStyle}>
                                <Typography sx={{textDecoration: "underline"}} className={interRegular.className}
                                            variant="subtitle1">NextJS, Material UI and Storybook website
                                    starter.</Typography>
                            </Item>
                            <Item sx={itemStyle}>
                                <Typography className={interLarge.className} component="p">A starter for web based
                                    projects, using NextJS (TypeScript), Material UI and Storybook</Typography>
                                <Typography className={interLarge.className} component="p">For installations and getting
                                    started, use the README!</Typography>
                            </Item>
                        </Stack>
                    </CardContent>
                </Card>
            </main>
        </>
    )
}
