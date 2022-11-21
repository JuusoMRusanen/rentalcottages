import LocationIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import HomeIcon from '@mui/icons-material/Home';
import BathtubIcon from '@mui/icons-material/Bathtub';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CottageInformationList({
  cottageData, 
  avatarSize, 
  dividers, 
  showPrimary, 
  primaryFontSize, 
  secondaryFontSize, 
  listPadding, 
  listMarginTop, 
  listMarginBottom, 
  itemPadding, 
  itemMarginTop, 
  itemMarginBottom, 
  textPadding, 
  textMargin,
  primaryPadding,
  secondaryPadding
}) {
    const { t } = useTranslation();

    const cottage = cottageData;

    const items = [
      {
        icon : <Tooltip title={t('location')}><LocationIcon/></Tooltip>,
        primary : t('location')+":",
        secondary : `${cottage.cityName}, ${cottage.regionName}`
      },
      {
        icon : <Tooltip title={t('accomodation')}><HotelIcon/></Tooltip>,
        primary : t('accomodation')+":",
        secondary : `${cottage.bedrooms} ${t('bedroomsPrul')}`
      },
      {
        icon : <Tooltip title={t('space')}><HomeIcon/></Tooltip>,
        primary : t('space')+":",
        secondary : `${cottage.size}m${"\u00B2"}`
      },
      {
        icon : <Tooltip title={t('bathrooms')}><BathtubIcon/></Tooltip>,
        primary : t('bathrooms')+":",
        secondary : `${cottage.bathrooms} ${t('bathroomsPrul')}`
      },
      {
        icon : <Tooltip title={t('price')}><CreditCardIcon/></Tooltip>,
        primary : t('price')+":",
        secondary : `${cottage.price}€ ${t('perWeek')}`
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
                ml: "10px",
                p: itemPadding ? itemPadding : 0,
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
                    p: primaryPadding ? primaryPadding : 0, 
                }} 
                secondaryTypographyProps={{
                    fontSize: secondaryFontSize ? secondaryFontSize : "18px",
                    p: secondaryPadding ? secondaryPadding : 0, 
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