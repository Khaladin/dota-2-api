import { useHeroes } from "../hooks/hooks";
import { Box, Button, Grid, ImageList, ImageListItem, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";

const HeroList = () => {
  const [heroType, setHeroType] = useState<Array<string>>(['agi', 'str', 'int', 'all']);
  const {data} = useHeroes();

  type HeroStats = {
    localized_name: string,
    primary_attr: string,
    img: any,
    icon: any,
  }

  const heroTypes = ['agi', 'str', 'int', 'all'];

  const handleType = (type: string) => {
    let newTypes = heroType;
    if (heroType.includes(type)) {
      newTypes = newTypes.filter((heroType: string) => heroType !== type);
    } else {
      newTypes.push(type);
    }
    setHeroType(newTypes);
  }

  const heroList = useMemo(() => data.filter((hero: HeroStats) => (hero.primary_attr)),
    [heroType]);

  return (
    <Box>
      <Stack flexDirection="row">
        <Button variant='contained' onClick={() => handleType("agi")}>Agility</Button>
        <Button onClick={() => handleType("str")}>Strength</Button>
        <Button onClick={() => handleType("int")}>Intelligence</Button>
        <Button onClick={() => handleType("all")}>Universal</Button>
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