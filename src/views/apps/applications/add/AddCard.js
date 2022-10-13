// ** React Imports
import { useState, forwardRef } from "react";
import { Link } from "next/link";

// ** MUI Imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TableContainer from "@mui/material/TableContainer";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import CardContent from "@mui/material/CardContent";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

//** Draft Imports
import ReactDraftWysiwyg from "src/@core/components/react-draft-wysiwyg";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// ** Icon Imports
import Plus from "mdi-material-ui/Plus";
import Close from "mdi-material-ui/Close";

// ** Third Party Imports
import DatePicker from "react-datepicker";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Custom Component Imports
import Repeater from "src/@core/components/repeater";

// ** Styles
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import SiteLogo from "src/pages/components/logo";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import PdfItem from "src/pages/components/pdf-item";
import { useRouter } from "next/router";
import { LabelText } from "../preview/PreviewCard";

export const RoundedTextField = styled(TextField)`
  .MuiOutlinedInput-root.MuiInputBase-root {
    border-radius: 1.125rem;
  }
`;

const CustomInput = forwardRef(({ ...props }, ref) => {
  return (
    <RoundedTextField
      size="medium"
      inputRef={ref}
      fullWidth={true}
      sx={{
        "& .MuiInputBase-input": { color: "text.secondary" },
      }}
      {...props}
    />
  );
});

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`,
}));

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "&:not(:last-of-type)": {
    marginBottom: theme.spacing(2),
  },
}));

const RepeatingContent = styled(Grid)(({ theme }) => ({
  paddingRight: 0,
  display: "flex",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  "& .col-title": {
    top: "-1.5rem",
    position: "absolute",
  },
  "& .MuiInputBase-input": {
    color: theme.palette.text.secondary,
  },
  [theme.breakpoints.down("lg")]: {
    "& .col-title": {
      top: "0",
      position: "relative",
    },
  },
}));

const RepeaterWrapper = styled(CardContent)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  "& .repeater-wrapper + .repeater-wrapper": {
    marginTop: theme.spacing(12),
  },
}));

const InvoiceAction = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`,
}));

const CustomSelectItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: "transparent !important",
  "&:hover": {
    backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important`,
  },
}));
const now = new Date();
const tomorrowDate = now.setDate(now.getDate() + 7);

const EditApplication = (props) => {
  // ** Props
  const {
    clients,
    invoiceNumber,
    selectedClient,
    setSelectedClient,
    toggleAddCustomerDrawer,
  } = props;

  // ** States
  const [count, setCount] = useState(1);
  const [selected, setSelected] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState(new Date(tomorrowDate));

  // ** Checkbox : Making them behave as radio box
  const [leftHandSideCheckBox, setLeftHandSideCheckbox] = useState({
    left: false,
    right: false,
  });
  const [rightHandSideCheckBox, setRightHandSideCheckbox] = useState({
    left: false,
    right: false,
  });

  const handleCheckBoxSelection = (event) => {
    const otherInput = event.target.dataset.other;
    if (event.target.dataset.group === "left") {
      setLeftHandSideCheckbox({
        [event.target.name]: event.target.checked,
        otherInput: !event.target.checked,
      });
    } else if (event.target.dataset.group === "right") {
      setRightHandSideCheckbox({
        [event.target.name]: event.target.checked,
        otherInput: !event.target.checked,
      });
    }
  };

  const [selectedFiles, setSelectedFiles] = useState(null);

  // ** Hook
  const theme = useTheme();

  // ** Deletes form
  const deleteForm = (e) => {
    e.preventDefault();

    // @ts-ignore
    e.target.closest(".repeater-wrapper").remove();
  };

  // ** Handle Invoice To Change
  const handleInvoiceChange = (event) => {
    setSelected(event.target.value);
    if (clients !== undefined) {
      setSelectedClient(
        clients.filter((i) => i.name === event.target.value)[0]
      );
    }
  };

  // ** Handle File Change
  const handleFileInputChange = (event) => {
    console.log(event);
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleAddNewCustomer = () => {
    toggleAddCustomerDrawer();
  };

  const router = useRouter();

  const removeFileFromFileList = (event, name) => {
    if (selectedFiles.find((el) => el.name !== name) === -1) return;
    Array.from(document.getElementById("pdf-files-input").files).filter(
      (el) => el.name !== name
    );

    setSelectedFiles(selectedFiles.filter((el) => el.name !== name));
  };

  return (
    <>
      <Card sx={{ overflow: "visible" }}>
        <CardHeader title="Dane Faktury" />
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={5}>
              <FormControl sx={{ mb: "1rem" }} fullWidth={true}>
                <RoundedTextField
                  id="outlined-basic"
                  size="medium"
                  label="Numer Faktury"
                  variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ mb: "1rem" }} fullWidth={true}>
                <RoundedTextField
                  id="outlined-basic"
                  label="Kwota Faktury"
                  variant="outlined"
                  size="medium"
                />
              </FormControl>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth={true} sx={{ mb: "1rem" }}>
                <DatePickerWrapper
                  sx={{
                    "& .react-datepicker-wrapper": { width: "100%" },
                  }}
                >
                  <Typography variant="body2">Data wistewiayanai:</Typography>
                  <DatePicker
                    id="issue-date"
                    selected={issueDate}
                    placeholderText="--/--/----"
                    customInputRef="ad"
                    customInput={
                      <CustomInput
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              Data wistewiayanai:
                            </InputAdornment>
                          ),
                        }}
                      />
                    }
                    onChange={(date) => setIssueDate(date)}
                  />
                </DatePickerWrapper>
              </FormControl>
              <FormControl fullWidth={true} sx={{ mb: "1rem" }}>
                <DatePickerWrapper
                  sx={{ "& .react-datepicker-wrapper": { width: "100%" } }}
                >
                  <Typography variant="body2">Data plast:</Typography>
                  <DatePicker
                    id="issue-date"
                    label="Data Płatności"
                    selected={dueDate}
                    placeholderText="--/--/----"
                    customInput={
                      <CustomInput
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              Data plast:
                            </InputAdornment>
                          ),
                        }}
                      />
                    }
                    onChange={(date) => setDueDate(date)}
                  />
                </DatePickerWrapper>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ ml: "auto" }}></Grid>
        </CardContent>
      </Card>
      <Grid
        container
        spacing={4}
        sx={{ mt: "2rem", justifyContent: "stretch" }}
      >
        <Grid item xs={12} sm={6}>
          <Card style={{ height: "100%" }}>
            <CardHeader title="Numer rachunek do wpłaty" />
            <CardContent>
              <FormControl sx={{ mb: "2rem" }} fullWidth={true}>
                <RoundedTextField
                  id="outlined-basic"
                  size="medium"
                  label="2011 6022 0200 0000 0540 6157 8231"
                  variant="outlined"
                  disabled
                  readOnly
                  inputProps={{
                    style: {
                      backgroundColor: "#0000001a",
                      borderRadius: "1.125rem",
                    },
                  }}
                />
              </FormControl>
              <FormGroup>
                <Typography variant="p">Metoda Płatności</Typography>
                <Box sx={{ display: "flex" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={leftHandSideCheckBox.left}
                        onChange={handleCheckBoxSelection}
                        inputProps={{
                          name: "left",
                          "data-other": "right",
                          "data-group": "left",
                        }}
                      />
                    }
                    label="Ekspres  PSD2"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={leftHandSideCheckBox.right}
                        onChange={handleCheckBoxSelection}
                        inputProps={{
                          name: "right",
                          "data-other": "left",
                          "data-group": "left",
                        }}
                      />
                    }
                    label="Przelew Tradycyny"
                  />
                </Box>
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Parametry Faktoringu" />
            <CardContent>
              <FormGroup>
                <Typography variant="p">Ubezpieczenie</Typography>
                <Box sx={{ display: "flex" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rightHandSideCheckBox.left}
                        onChange={handleCheckBoxSelection}
                        inputProps={{
                          name: "left",
                          "data-other": "right",
                          "data-group": "right",
                        }}
                      />
                    }
                    label="Ubezpieczenie"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rightHandSideCheckBox.right}
                        onChange={handleCheckBoxSelection}
                        inputProps={{
                          name: "right",
                          "data-other": "left",
                          "data-group": "right",
                        }}
                      />
                    }
                    label="Bez Ubezpieczenia"
                  />
                </Box>
              </FormGroup>
              <FormGroup>
                <Box sx={{ display: "flex", gap: "2rem", mt: "1rem" }}>
                  <FormControl fullWidth={false}>
                    <LabelText>IIiosc dni</LabelText>
                    <Select
                      sx={{
                        borderRadius: "1.125rem",
                        mt: "0.5rem",
                      }}
                    >
                      <MenuItem value={50}>50%</MenuItem>
                      <MenuItem value={75}>75%</MenuItem>
                      <MenuItem value={100}>100%</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <LabelText>Kwota %</LabelText>
                    <Select sx={{ borderRadius: "1.125rem", mt: "0.5rem" }}>
                      <MenuItem value={21}>21 dni</MenuItem>
                      <MenuItem value={28}>28 dni</MenuItem>
                      <MenuItem value={35}>35 dni</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </FormGroup>
              <FormGroup sx={{ mt: "1rem" }}>
                <Typography
                  sx={{ mb: "1rem", display: "block", textAlign: "center" }}
                  variant="p"
                >
                  Kwota płatności dla wybranych parametrów
                </Typography>
                <Typography
                  sx={{ mb: "1rem", fontWeight: "bold", textAlign: "center" }}
                  variant="p"
                >
                  0,00 zł
                </Typography>
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ mt: "2rem" }}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Załączniki" />
            <CardContent>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {selectedFiles === null && (
                  <Typography>Brak wybranych plików.</Typography>
                )}
                {selectedFiles !== null &&
                  selectedFiles.length > 0 &&
                  selectedFiles.map((el) => (
                    <PdfItem
                      key={el.name}
                      name={el.name}
                      fileType={el.type}
                      removeFileFromFileList={removeFileFromFileList}
                    />
                  ))}
              </Box>
              <Box sx={{ mt: "1rem", textAlign: "end" }}>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "1.125rem" }}
                  component="label"
                >
                  Załącz pliki
                  <input
                    accept="application/pdf"
                    style={{ display: "none" }}
                    id="pdf-files-input"
                    multiple
                    type="file"
                    onInput={handleFileInputChange}
                  />
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ mt: "2rem" }}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Dodotkowe Informacje" />
            <CardContent>
              <Typography variant="p">
                Miejsce na dodatkową treść, bądź informacje,
              </Typography>
              <Box
                sx={{
                  mt: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #4c4e641f",
                }}
              >
                <ReactDraftWysiwyg />
              </Box>
              <Box sx={{ mt: "1rem", textAlign: "end" }}></Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: "2rem", textAlign: "end" }}>
        <Button
          sx={{
            p: "0.75rem 3rem",
            borderRadius: "1.125rem",
            mr: "1rem",
          }}
          variant="contained"
          onClick={() => router.push("/dashboards/crm/success")}
        >
          Zapisz
        </Button>
        <Button
          sx={{
            p: "0.75rem 3rem",
            borderRadius: "1.125rem",
            background:
              "linear-gradient( 125deg, rgba(97, 73, 205, 1) 0%, rgba(231, 94, 140, 1) 100%)",
          }}
          variant="contained"
          onClick={() => router.push("/dashboards/crm/success")}
        >
          Wyślij Wniosek
        </Button>
      </Box>
    </>
  );
};

export default EditApplication;
