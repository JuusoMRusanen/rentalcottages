import { Box, Divider, Typography } from "@mui/material";
import StarRating from "../StarRating";
import moment from 'moment';

export default function Reviews({ userReviews }) {
  return(
    <>
    {userReviews
    ?
    <>
    <Box
      sx={{
        width:'100%',
        height:'auto',
        p:'10px',
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
          >Arvostelut
        </Typography>
      </Divider>

      {userReviews.map((userReview, index) => {

        const date = moment(userReview.date).format('DD.MM.YYYY')

        return(
          <>
          <Box
            key={index}
            sx={{
              width:'100%',
              height:'auto',
              p:'10px',
            }}
            >
            <StarRating rating={userReview.rating} />
            
            <Typography variant="body1" sx={{ mt:'10px' }}>{userReview.comment}</Typography>
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
          </>
        )
      })}
    </Box>
    </>
    : null
    }
    </>
  )
}