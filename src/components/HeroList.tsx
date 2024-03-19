import { useHeroes, useHeroMatchups } from "../hooks/hooks";
import { Box, Button, Grid, ImageList, ImageListItem, Stack, Typography, ToggleButtonGroup, toggleButtonGroupClasses, ToggleButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const HeroList = () => {
  const [attributeFilter, setAttributeFilter] = useState(() => ['agi', 'str', 'int', 'all']);
  const [selectedHero, setSelectedHero] = useState<number>(0);
  const {data} = useHeroes();
  const {data: heroMatchups, refetch} = useHeroMatchups(selectedHero);

  console.log(heroMatchups);

  type HeroStats = {
    id: number
    localized_name: string,
    primary_attr: string,
    img: any,
    icon: any,
  }


  const heroList = useMemo(() => data.filter((hero: HeroStats) => (attributeFilter.includes(hero.primary_attr))),
    [attributeFilter]);

  const handleAttributeFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setAttributeFilter(newFormats);
  };

  function handleHeroSelect(id: number) {
    setSelectedHero(id);
    refetch();
  }

  return (
    <Box>
      <Stack flexDirection="row" sx={{justifyContent: "center"}} mt={4}>
        <ToggleButtonGroup
          color={'primary'}
          value={attributeFilter}
          onChange={handleAttributeFilter}
          aria-label="attribute filter"
        >
          <ToggleButton
            value={'agi'}
            aria-label="agility"
            sx={{
              background: 'white',
              color: 'red',
            }}
          >
            Agility
          </ToggleButton>
          <ToggleButton value={'str'} aria-label="strength">Strength</ToggleButton>
          <ToggleButton value={'int'} aria-label="intelligence">Intelligence</ToggleButton>
          <ToggleButton value={'all'} aria-label="universal">Universal</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <ImageList cols={3}>
            {heroList.map((hero: HeroStats) => {
              return (
                <ImageListItem
                  sx={{
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(200px, 1fr))!important',
                  }}
                  onClick={() => handleHeroSelect(hero.id)}
                >
                  <motion.div animate={{scale:1}} initial={{scale:0}}>
                    <img src={`https://cdn.cloudflare.steamstatic.com/${hero.img}`} srcSet={`https://cdn.cloudflare.steamstatic.com/${hero.img}`}/>
                  </motion.div>
                </ImageListItem>)
            })}
          </ImageList>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeroList;