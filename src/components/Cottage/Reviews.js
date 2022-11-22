import { Box, Divider, Typography } from "@mui/material";
import StarRating from "../StarRating/StarRating";
import moment from 'moment';
import { useTranslation } from "react-i18next";

export default function Reviews({ userReviews }) {

  const { t } = useTranslation();

  return(
    <>
    {userReviews
    ?
    <>
    <Box
      sx={{
        width:'100%',
        height:'auto',
        p:'0px',
        mb:'20px',
      }}
      >
      <Divider>
        <Typography 
          variant='h4'
          sx={{
            marginTop:5,
            marginBottom:5,
          }}
          >{t('reviews')}
        </Typography>
      </Divider>

      {userReviews.map((userReview, index) => {

        const date = moment(userReview.date).format(t('dateFormat'))

        return(
          <Box
            key={index}
            sx={{
              width:'100%',
              height:'auto',
              p:'0px',
            }}
            >
          <Box
            sx={{
              width:'100%',
              height:'auto',
              p:'0px',
            }}
            >
            <StarRating rating={userReview.rating} disableTooltip={true} />
            
            <Typography variant="body1" sx={{ mt:'10px' }} >{userReview.comment}</Typography>
            <Typography variant="body1" sx={{ mt:'10px' }} >{userReview.nickName} {date}</Typography>
          </Box>

          {index !== userReviews.length - 1
          ?
          <Divider 
            sx={{
              p:'20px',
            }}
            />
          : null
          }
          </Box>
        )
      })}
    </Box>
    </>
    : null
    }
    </>
  )
}