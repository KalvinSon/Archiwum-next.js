// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Data Rejestracji Firmy' fullWidth {...props} />
})

const TabInfo = () => {
  // ** State
  const [date, setDate] = useState(null)
  const [openAlert, setOpenAlert] = useState(true)

  return (
    <CardContent>
      <form>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ mt: 5 }}>
            <TextField
              fullWidth
              multiline
              label='Informacje o działalności firmy'
              minRows={2}
              placeholder='Bio'
              defaultValue='Hight Tech to nowoczesna marka, która powstała z potrzeb rynku i wspierania OZE. Innowacyjne i ekologiczne produkty, nie tylko umożliwiają efektywne wykorzystanie Twojej instalacji fotowoltaicznej, ale również dają Ci możliwość samodzielnego, skutecznego i bezpiecznego czyszczenia paneli, tym samym po raz kolejny zyskujesz czas i pieniądze.'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Nazwa Firmy'
              placeholder='Hight Tech Sp. z. o.'
              defaultValue='Hight Tech Sp. z. o.'
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Numer NIP' placeholder='123-456-78-90' defaultValue='123-456-78-90' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Numer REGON' placeholder='123456789' defaultValue='123456789' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Adres Firmy'
              placeholder='ul. Mickiewicza 3/2'
              defaultValue='ul. Mickiewicza 3/2'
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Miasto' placeholder='Warszawa' defaultValue='Warszawa' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Kod Pocztowy' placeholder='03-288' defaultValue='03-288' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label='Numer Telefonu do Firmy'
              placeholder='+48 501 456 890'
              defaultValue='+48 501 456 890'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label='Adres Email do Firmy'
              placeholder='biuro@fifth-factor.pl'
              defaultValue='biuro@fifth-factor.pl'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label='Adres Strony Internetowej'
              placeholder='https://fifth-factor.pl'
              defaultValue='https://fifth-factor.pl'
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Nazwa Banku' placeholder='Bank Milennium' defaultValue='Bank Milennium' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='BIC/SWIFT' placeholder='BIGB-PLPW' defaultValue='BIGB-PLPW' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Numer Konta Bankowego do wpłat'
              placeholder='2011 6022 0200 0000 0540 6157 82'
              defaultValue='2011 6022 0200 0000 0540 6157 82'
            />
          </Grid>

          {openAlert ? (
            <Grid item xs={12}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle sx={{ mb: '.15rem' }}>
                  Twoje konto bankowe nie zostało jeszcze potwierdzone. Po wykonaniu przelewu bankowego w wysokości 1zł
                  nasi pracownicy sprawdzą zgodność przesłanych danych. Każda zmiana numeru rachunku wymaga
                  potwierdzenia danych przez pracownika Fifth Factor.
                </AlertTitle>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(7)} !important` }}>
            <Button variant='contained' sx={{ mr: 4 }}>
              Zapisz Zmiany
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
