import React, { useState } from 'react'
import { format } from 'date-fns'
import { fi, enUS } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE, useDateInput } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { Grid, TextField, Typography, useTheme } from '@mui/material'
import './styles.css'
import { useTranslation } from 'react-i18next'

export default function DateRangePickerCalendarExample({
  showSelectedDates, 
  showInputs, 
  maxWidth, 
  mb, 
  mt, 
  startDate, 
  endDate, 
  setEndDate, 
  setStartDate
}) {
  
  const { t } = useTranslation();
  
  const [focus, setFocus] = useState(START_DATE)

  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
  }
  
  const inputPropsStart = useDateInput({
    startDate,
    format: t('dateFormat'),
    locale: t('dateLocale') === "fi-FI" ? fi : enUS,
    onDateChange: setStartDate
  })

  const inputPropsEnd = useDateInput({
    endDate,
    format: t('dateFormat'),
    locale: t('dateLocale') === "fi-FI" ? fi : enUS,
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
          <Typography variant='body1'>{t('startDate')+": "} {startDate ? format(startDate, t('dateFormat'), { locale: fi }) : 'none'}</Typography>
          <Typography variant='body1'>{t('endDate')+": "} {endDate ? format(endDate, t('dateFormat'), { locale: fi }) : 'none'}</Typography>
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
          locale={t('dateLocale') === "fi-FI" ? fi : enUS}
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