// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`Copyright © ${new Date().getFullYear()}`}
        <Box component='span' sx={{ color: 'error.main' }}>
        </Box>
        {` by `}
        <Link target='_blank' href='https://fifth-factor.pl/'>
          Fifth Factor
        </Link>
      {'. Wszelkie prawa zastrzeżone. '}
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link
            target='_blank'
            href='https://fifth-factor.pl'
          >
            Strona Główna
          </Link>
          <Link target='_blank' href='https://fifth-factor.pl/regulamin'>
            Regulamin
          </Link>
          <Link target='_blank' href='https://fifth-factor.pl/polityka'>
            Polityka Prywatności
          </Link>
          <Link target='_blank' href='https://fifth-factor.pl'>
            Kontakt
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
