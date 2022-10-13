// ** MUI Imports
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'

// Styled Box component
const StyledBox1 = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: '10px',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6),
  marginRight: theme.spacing(3.125),
  backgroundColor: `rgba(${theme.palette.customColors.main}, 0.05)`,
  [theme.breakpoints.down('md')]: {
    marginRight: 0,
    marginBottom: theme.spacing(3.125)
  }
}))

// Styled Box component
const StyledBox2 = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: '10px',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6),
  marginLeft: theme.spacing(3.125),
  backgroundColor: `rgba(${theme.palette.customColors.main}, 0.05)`,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    marginTop: theme.spacing(3.125)
  }
}))

const FaqFooter = () => {
  return (
    <Box sx={{ mt: theme => `${theme.spacing(12)} !important` }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h6' sx={{ mb: 2.5 }}>
          Wciąż masz pytania?
        </Typography>
        <Typography variant='body2' sx={{ mb: 8.5 }}>
          Jesli nie możesz znaleźć odpowiedzi na nurtujące Cię pytanie. Napisz lub zadzwoń do nas, chętnie pomożemy !
        </Typography>
      </Box>

      <Grid container>
        <Grid item xs={12} md={6}>
          <StyledBox1>
            <Avatar
              variant='rounded'
              sx={{ height: 42, width: 42, backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)` }}
            >
              <Phone sx={{ color: 'text.primary', fontSize: '1.5rem' }} />
            </Avatar>
            <Typography variant='h6' sx={{ my: 3 }}>
              + (810) 2548 2568
            </Typography>
            <Typography variant='body2'>Infolinia czynna w godzinach 8 - 16 w dni powszednie</Typography>
          </StyledBox1>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledBox2>
            <Avatar
              variant='rounded'
              sx={{ height: 42, width: 42, backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)` }}
            >
              <EmailOutline sx={{ color: 'text.primary', fontSize: '1.5rem' }} />
            </Avatar>
            <Typography variant='h6' sx={{ my: 3 }}>
              hello@help.com
            </Typography>
            <Typography variant='body2'>Staramy się odpisać maksymalnie do 24h</Typography>
          </StyledBox2>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FaqFooter
