import LocationIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import HomeIcon from '@mui/icons-material/Home';
import BathtubIcon from '@mui/icons-material/Bathtub';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export default function CottageInformationList({cottageData, avatarSize, dividers, showPrimary, primaryFontSize, secondaryFontSize, listPadding, listMarginTop, listMarginBottom, itemPadding, itemMarginTop, itemMarginBottom, textPadding, textMargin }) {

    const cottage = cottageData;

    const items = [
      {
        icon : <LocationIcon/>,
        primary : "Sijainti:",
        secondary : `${cottage.cityName}, ${cottage.regionName}`
      },
      {
        icon : <HotelIcon/>,
        primary : "Majoitus:",
        secondary : `${cottage.bedrooms} makuuhuonetta`
      },
      {
        icon : <HomeIcon/>,
        primary : "Tilavuus:",
        secondary : `${cottage.size}m${"\u00B2"}`
      },
      {
        icon : <BathtubIcon/>,
        primary : "Kylpyhuoneet:",
        secondary : `${cottage.bathrooms} kylpyhuonetta`
      },
      {
        icon : <CreditCardIcon/>,
        primary : "Hinta:",
        secondary : `${cottage.price}€ /vko`
      }
    ]

    return(
      <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            mt: listMarginTop ? listMarginTop : 0,
            mb: listMarginBottom ? listMarginBottom : 0,
            p: listPadding ? listPadding : 0,
          }}
        >
        {items.map((item, idx) => {
          return(
            <Box
            key={idx}
            >
            <ListItem
              key={idx}
              sx={{
                mt: itemMarginTop ? itemMarginTop : 0,
                mb: itemMarginBottom ? itemMarginBottom : 0,
                p: itemPadding ? itemPadding : "5px",
              }}
              >
              <ListItemAvatar
                sx={{
                  m:0,
                  p:0,
                }}
                >
                <Avatar
                  sx={{ 
                    width: avatarSize ? avatarSize : 30, 
                    height: avatarSize ? avatarSize : 30,
                    m:0,
                    p:0,
                  }}
                  >
                  {item.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                    fontSize: primaryFontSize ? primaryFontSize : "18px",
                }} 
                secondaryTypographyProps={{
                    fontSize: secondaryFontSize ? secondaryFontSize : "18px",
                }}
                primary={showPrimary ? item.primary : null}
                secondary={item.secondary}
                sx={{
                  m: textMargin ? textMargin : 0,
                  p: textPadding ? textPadding : 0,
                }}
                />
            </ListItem>

            {dividers && idx !== items.length - 1
            ?
            <>
              <Divider variant="inset" />
            </>
            : null
            }
            </Box>
          );
        })}
      </List>
    );
  }