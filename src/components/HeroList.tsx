import { useHeroes, useHeroMatchups } from "../hooks/hooks";
import { Box, Button, Grid, ImageList, ImageListItem, Stack, Typography, ToggleButtonGroup, toggleButtonGroupClasses, ToggleButton, ButtonBase } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

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
                        'repeat(auto-fill, minmax(220px, 1fr))!important',
                    }}
                    onClick={() => handleHeroSelect(hero.id)}
                  >
                    <ImageButton sx={{
                      borderRadius: 5,
                      backgroundOpacity: 0.4,
                      transition: '0.3s',
                      '&:hover': {
                        background: "#abc",
                        backgroundOpacity: 0.8,
                      }
                    }}>
                      <motion.div animate={{scale:1}} initial={{scale:0}}>
                        <img
                          src={`https://cdn.cloudflare.steamstatic.com/${hero.img}`}
                          srcSet={`https://cdn.cloudflare.steamstatic.com/${hero.img}`}
                        />
                      </motion.div>
                    </ImageButton>
                  </ImageListItem>
                )
            })}
          </ImageList>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeroList;