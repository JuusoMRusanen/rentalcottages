import React, { useState } from 'react'
import { format } from 'date-fns'
import { fi } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE, useDateInput } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { Grid, TextField, Typography, useTheme } from '@mui/material'
import './styles.css'

export default function DateRangePickerCalendarExample({showSelectedDates, showInputs, maxWidth, mb, mt, startDate, endDate, setEndDate, setStartDate}) {
  
  const [focus, setFocus] = useState(START_DATE)

  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
  }
  
  const inputPropsStart = useDateInput({
    startDate,
    format: 'dd.MM.yyyy',
    locale: fi,
    onDateChange: setStartDate
  })

  const inputPropsEnd = useDateInput({
    endDate,
    format: 'dd.MM.yyyy',
    locale: fi,
    onDateChange: setEndDate
  })

  const theme = useTheme();
  
  return (
  <>
    <Grid container
      sx={{
        maxWidth: maxWidth ? maxWidth : null,
        maxHeight: maxWidth ? maxWidth : null,
        mb: mb ? mb : null,
        mt: mt ? mt : null,
      }}
      >

      {showSelectedDates
      ?
      <>
        <Grid item xs={12}>
          <Typography variant='body1'>Alkamispäivä: {startDate ? format(startDate, 'dd.MM.yyyy', { locale: fi }) : 'none'}</Typography>
          <Typography variant='body1'>Loppumispäivä: {endDate ? format(endDate, 'dd.MM.yyyy', { locale: fi }) : 'none'}</Typography>
        </Grid>
      </>
      : null
      }

      {showInputs
      ?
      <>
        <Grid item xs={6}>
          <TextField id="outlined-basic" label="Alku" variant="outlined" {...inputPropsStart} />
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic" label="Loppu" variant="outlined" {...inputPropsEnd} />
        </Grid>
      </>
      : null
      }

      <Grid item xs={12}>
        <DateRangePickerCalendar
          startDate={startDate}
          endDate={endDate}
          focus={focus}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onFocusChange={handleFocusChange}
          locale={fi}
          touchDragEnabled={true}
          sx={{
              niceDatesNavigation:{
                  color: theme.palette.primary,
              },
              niceDatesDay:{
                  color: theme.palette.primary,
              }
          }}
        />
      </Grid>
    </Grid>
  </>
  )
}