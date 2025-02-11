// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import { DataGrid } from "@mui/x-data-grid";
import Select from "@mui/material/Select";

// ** Icons Imports
import Send from "mdi-material-ui/Send";
import Check from "mdi-material-ui/Check";
import ChartPie from "mdi-material-ui/ChartPie";
import Download from "mdi-material-ui/Download";
import ArrowDown from "mdi-material-ui/ArrowDown";
import EyeOutline from "mdi-material-ui/EyeOutline";
import TrendingUp from "mdi-material-ui/TrendingUp";
import ContentCopy from "mdi-material-ui/ContentCopy";
import DotsVertical from "mdi-material-ui/DotsVertical";
import PencilOutline from "mdi-material-ui/PencilOutline";
import DeleteOutline from "mdi-material-ui/DeleteOutline";
import InformationOutline from "mdi-material-ui/InformationOutline";
import ContentSaveOutline from "mdi-material-ui/ContentSaveOutline";

// ** Third Party Imports
import format from "date-fns/format";
import DatePicker from "react-datepicker";

// ** Store & Actions Imports
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteInvoice } from "src/store/apps/invoice";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";
import TableHeader from "src/views/apps/invoice/list/TableHeader";

// ** Third Party Styles Imports
import "react-datepicker/dist/react-datepicker.css";

// ** Styled Components
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import { useTranslation } from "react-i18next";

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

// ** Styled component for the link in the dataTable
const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const RowOptions = ({ id }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null);
  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <Download fontSize="small" sx={{ mr: 2 }} />
          Download
        </MenuItem>
        <Link href={`/apps/invoice/edit/${id}`} passHref>
          <MenuItem>
            <PencilOutline fontSize="small" sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        </Link>
        <MenuItem>
          <ContentCopy fontSize="small" sx={{ mr: 2 }} />
          Duplicate
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

// ** @TODO: Translation point-1
// ** Vars
export const invoiceStatusObj = {
  Sent: {
    color: "success",
    icon: <Send sx={{ fontSize: "1.25rem" }} />,
    label: "Zaakceptowany",
  },
  Paid: {
    color: "success",
    icon: <Check sx={{ fontSize: "1.25rem" }} />,
    label: "Zaakceptowany",
  },
  Draft: {
    color: "secondary",
    icon: <ContentSaveOutline sx={{ fontSize: "1.25rem" }} />,
    label: "Procedowany",
  },
  "Partial Payment": {
    color: "error",
    icon: <ChartPie sx={{ fontSize: "1.25rem" }} />,
    label: "Odrzucony",
  },
  "Past Due": {
    color: "error",
    icon: <InformationOutline sx={{ fontSize: "1.25rem" }} />,
    label: "Odrzucony",
  },
  Downloaded: {
    color: "secondary",
    icon: <ArrowDown sx={{ fontSize: "1.25rem" }} />,
    label: "Procedowany",
  },
};

// ** renders client column
const renderClient = (row) => {
  if (row.avatar.length) {
    return (
      <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        color={row.avatarColor || "primary"}
        sx={{ mr: 3, fontSize: "1rem", width: 34, height: 34 }}
      >
        {getInitials(row.name || "John Doe")}
      </CustomAvatar>
    );
  }
};

const defaultColumns = [
  {
    flex: 0.1,
    field: "id",
    minWidth: 80,
    headerName: "ID Wniosku",
    renderCell: ({ row }) => (
      <Link href={`/apps/invoice/preview/${row.id}`} passHref>
        <StyledLink>{`#${row.id}`}</StyledLink>
      </Link>
    ),
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: "invoiceStatus",
    headerName: "Status Wniosku",
    renderCell: ({ row }) => {
      const { dueDate, balance, invoiceStatus } = row;
      const color = invoiceStatusObj[invoiceStatus]
        ? invoiceStatusObj[invoiceStatus].color
        : "primary";
      const Icon = invoiceStatusObj[invoiceStatus]
        ? invoiceStatusObj[invoiceStatus].icon
        : null;
      // @TODO: Translation point-1
      return (
        <CustomChip
          size="small"
          skin="light"
          color={color}
          label={invoiceStatusObj[invoiceStatus].label}
        />
        // <Tooltip
        //   title={
        //     <div>
        //       <Typography
        //         variant="caption"
        //         sx={{ color: "common.white", fontWeight: 600 }}
        //       >
        //         {invoiceStatus}
        //       </Typography>
        //       <br />
        //       <Typography
        //         variant="caption"
        //         sx={{ color: "common.white", fontWeight: 600 }}
        //       >
        //         Balance:
        //       </Typography>{" "}
        //       {balance}
        //       <br />
        //       <Typography
        //         variant="caption"
        //         sx={{ color: "common.white", fontWeight: 600 }}
        //       >
        //         Due Date:
        //       </Typography>{" "}
        //       {dueDate}
        //     </div>
        //   }
        // >
        //   <CustomAvatar
        //     skin="light"
        //     color={color}
        //     sx={{ width: 34, height: 34 }}
        //   >
        //     {Icon}
        //   </CustomAvatar>
        // </Tooltip>
      );
    },
  },
  {
    flex: 0.25,
    field: "name",
    minWidth: 300,
    headerName: "Klient",
    renderCell: ({ row }) => {
      const { name, companyEmail } = row;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(row)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{
                color: "text.primary",
                fontWeight: 500,
                lineHeight: "22px",
                letterSpacing: ".1px",
              }}
            >
              {name}
            </Typography>
            <Typography noWrap variant="caption">
              {companyEmail}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: "total",
    headerName: "Kwota Faktury",
    renderCell: ({ row }) => (
      <Typography variant="body2">{`${row.total || 0} zł`}</Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: "issuedDate",
    headerName: "Data Wniosku",
    renderCell: ({ row }) => (
      <Typography variant="body2">{row.issuedDate}</Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: "payment_method",
    headerName: "METODA PŁATNOŚCI",
    renderCell: ({ row }) => (
      <Typography variant="body2">
        {row.total < 4000 ? "Przyspieszona" : "Standardowa"}
      </Typography>
    ),
  },
];
/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate =
    props.start !== null ? format(props.start, "MM/dd/yyyy") : "";
  const endDate =
    props.end !== null ? ` - ${format(props.end, "MM/dd/yyyy")}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ""}`;
  props.start === null && props.dates.length && props.setDates
    ? props.setDates([])
    : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return (
    <TextField
      fullWidth
      inputRef={ref}
      {...updatedProps}
      label={props.label || ""}
      value={value}
    />
  );
});

/* eslint-enable */
const InvoiceList = () => {
  // ** State
  const [dates, setDates] = useState([]);
  const [value, setValue] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [statusValue, setStatusValue] = useState("");
  const [endDateRange, setEndDateRange] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);

  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state) => state.invoice);
  useEffect(() => {
    dispatch(
      fetchData({
        dates,
        q: value,
        status: statusValue,
      })
    );
  }, [dispatch, statusValue, value, dates]);

  const handleFilter = (val) => {
    setValue(val);
  };

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };

  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  const columns = [
    ...defaultColumns,
    // {
    //   flex: 0.1,
    //   minWidth: 130,
    //   sortable: false,
    //   field: "actions",
    //   headerName: "Actions",
    //   renderCell: ({ row }) => (
    //     <Box sx={{ display: "flex", alignItems: "center" }}>
    //       <Tooltip title="Delete Invoice">
    //         <IconButton
    //           size="small"
    //           sx={{ mr: 0.5 }}
    //           onClick={() => dispatch(deleteInvoice(row.id))}
    //         >
    //           <DeleteOutline />
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title="View">
    //         <Box>
    //           <Link href={`/apps/invoice/preview/${row.id}`} passHref>
    //             <IconButton
    //               size="small"
    //               component="a"
    //               sx={{ textDecoration: "none", mr: 0.5 }}
    //             >
    //               <EyeOutline />
    //             </IconButton>
    //           </Link>
    //         </Box>
    //       </Tooltip>
    //       <RowOptions id={row.id} />
    //     </Box>
    //   ),
    // },
  ];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Filtry" />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="invoice-status-select">
                    Status Wniosku
                  </InputLabel>

                  <Select
                    fullWidth
                    value={statusValue}
                    sx={{ mr: 4, mb: 2 }}
                    label="Status Wniosku"
                    onChange={handleStatusValue}
                    labelId="invoice-status-select"
                  >
                    <MenuItem value="">Wszystkie</MenuItem>
                    <MenuItem value="Sent">Zaakceptowane</MenuItem>
                    <MenuItem value="Past Due">Odrzucone</MenuItem>
                    <MenuItem value="Draft">Procedowany</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePickerWrapper>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id="date-range-picker-months"
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label="Zakres Dat"
                        end={endDateRange}
                        start={startDateRange}
                      />
                    }
                  />
                </DatePickerWrapper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            value={value}
            selectedRows={selectedRows}
            handleFilter={handleFilter}
          />

          <ThemeProvider theme={theme}>          
            <DataGrid
              labelRowsPerPage="asd:" // @TODO Translation
              autoHeight
              pagination
              rows={store.data}
              columns={columns}
              disableSelectionOnClick
              pageSize={Number(pageSize)}
              rowsPerPageOptions={[5, 10]}
              sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
              onSelectionModelChange={(rows) => setSelectedRows(rows)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
          </ThemeProvider>;
        </Card>
      </Grid>
    </Grid>
  );
};

export default InvoiceList;
