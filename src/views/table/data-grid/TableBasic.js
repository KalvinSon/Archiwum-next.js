// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { plPL } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  plPL,
);

const columns = [
  {
    flex: 0.05,
    field: 'id',
    minWidth: 80,
    headerName: 'ID'
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'full_name',
    headerName: 'Nazwa Firmy'
  },
  {
    flex: 0.35,
    minWidth: 230,
    field: 'email',
    headerName: 'Forma Prawna'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'start_date',
    headerName: 'Email'
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'experience',
    headerName: 'Telefon'
  },
  {
    flex: 0.1,
    field: 'age',
    minWidth: 80,
    headerName: 'Age'
  }
]

const TableBasic = () => {
  return (
    <Card>
      <CardHeader title='Moje Firmy' />
      <Box sx={{ height: 632 }}>
        <ThemeProvider theme={theme}>
          <DataGrid columns={columns} rows={rows.slice(0, 10)} />
        </ThemeProvider>;
      </Box>
    </Card>
  )
}

export default TableBasic
