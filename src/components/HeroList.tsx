import { useHeroes } from "../hooks/hooks";
import { Box, Button, Grid, ImageList, ImageListItem, Stack, Typography } from "@mui/material";
import { MouseEventHandler, useMemo, useState } from "react";

const HeroList = () => {
  const [heroType, setHeroType] = useState<string>();
  const {data} = useHeroes();

  type HeroStats = {
    localized_name: string,
    primary_attr: string,
    img: any,
    icon: any,
  }

  const heroTypes = ['agi', 'str', 'int', 'unv'];

  const handleType = (type: string) => {
    setHeroType(type)
  }
  const heroList = useMemo(() => data.filter((hero: HeroStats) => hero.primary_attr === heroType),
    [heroType]);

  return (
    <Box>
      <Stack flexDirection="row">
        <Button onClick={() => handleType("agi")}>Agility</Button>
        <Button>Strength</Button>
        <Button value="int">Intelligence</Button>
        <Button value="unv">Universal</Button>
      </Stack>
      <Grid container>
        <Grid item xs={12}>
          <ImageList cols={4} rowHeight={130}>
            {heroList.map((hero: HeroStats) => {
              return <ImageListItem sx={{margin: 1}}>
                <img src={`https://cdn.cloudflare.steamstatic.com/${hero.img}`} srcSet={`https://cdn.cloudflare.steamstatic.com/${hero.img}`}/>
              </ImageListItem>
            })}
          </ImageList>
        </Grid>
        <Grid item xs={12}>
          <Typography>Heroes</Typography>
          {heroList.map((hero: HeroStats) => {
            return <Grid item>{hero.localized_name}</Grid>
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeroList;