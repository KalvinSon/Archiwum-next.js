// ** MUI Imports
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import EmailOutline from 'mdi-material-ui/EmailOutline'

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    marginLeft: theme.spacing(1.5),
    color: theme.palette.text.secondary
  }
}))

const TabNotifications = () => {
  return (
    <CardContent sx={{ pt: 10 }}>
      <form>
        <Box sx={{ mb: 4.5, display: 'flex', alignItems: 'center' }}>
          <Poll sx={{ fontSize: '1.75rem', mr: 2 }} />
          <Typography variant='h6'>Aktywność</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel control={<Switch defaultChecked />} label='Wysyłaj powiadomienia o aktualizacji statusu wniosków' />
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label='Wysyłaj informacje o nowościach, i aktualizacjach systemu'
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControlLabel control={<Switch />} label='Wyrażam zgode na przesyłanie ofert marketingowych' />
        </Box>

        <Box sx={{ mt: 6, mb: 4.5, display: 'flex', alignItems: 'center' }}>
          <EmailOutline sx={{ fontSize: '1.75rem', mr: 2 }} />
          <Typography variant='h6'>Powiadomienia</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel control={<Switch />} label='Wysyłaj powiadomienie gdy otrzymam wiadomość poprzez chat' />
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControlLabel control={<Switch defaultChecked />} label='Wysyłaj powiadomienie gdy otrzymam wiadomość na skrzynkę odbiorczą' />
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControlLabel control={<Switch />} label='Wysyłaj powiadomienia o wydarzeniach z kalendarza' />
        </Box>

        <Box sx={{ mt: 6 }}>
          <Button variant='contained' sx={{ mr: 4 }}>
            Zapisz Zmiany
          </Button>
        </Box>        
      </form>
    </CardContent>
  )
}

export default TabNotifications
