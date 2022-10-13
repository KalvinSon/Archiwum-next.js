// ** MUI Imports
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/system";

import PdfItem from "src/pages/components/pdf-item";

// ** Configs
import themeConfig from "src/configs/themeConfig";

import { invoiceStatusObj, renderClient } from "src/pages/dashboards/crm/list";

import { Select, MenuItem, InputLabel } from "@mui/material";
import { RoundedTextField } from "../add/AddCard";

export const ResultText = ({ children, sx }) => (
  <Typography
    fontWeight={500}
    sx={{ ml: "1rem", color: "#000", ...sx }}
    variant="body"
  >
    {children}
  </Typography>
);

export const LabelText = ({ children }) => (
  <Typography variant="body2">{children}</Typography>
);

const PreviewCard = ({ data }) => {
  if (data) {
    return (
      <>
        <Grid
          container
          spacing={4}
          sx={{ mt: "2rem", justifyContent: "stretch" }}
        >
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader title="Parametry Fakroringu" />
              <CardContent>
                <div style={{ marginBottom: "1rem" }}>
                  <LabelText>Ubezpiec</LabelText>
                  <Box>
                    <Checkbox defaultChecked disabled />
                    <ResultText>Z Ubezpie</ResultText>
                  </Box>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <LabelText>IIiosc dni</LabelText>
                  </div>
                  <div style={{ darginBottomsplay: "block" }}>
                    <InputLabel>Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      sx={{
                        borderRadius: "1.125rem",
                      }}
                    >
                      <MenuItem value={10}>
                        <ResultText>Ten</ResultText>
                      </MenuItem>
                      <MenuItem selected value={21}>
                        <ResultText>21</ResultText>
                      </MenuItem>
                      <MenuItem value={30}>
                        <ResultText>Thirty</ResultText>
                      </MenuItem>
                    </Select>
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <LabelText>Kwota</LabelText>
                  <ResultText>136.01oz</ResultText>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Rachunek Do" />
              <CardContent>
                <RoundedTextField
                  fullWidth={true}
                  size="medium"
                  disabled
                  value="1231312 123123"
                  sx={{ mb: "2rem" }}
                />
                <Box sx={{ mb: "1rem" }}>
                  <LabelText>Numur Rachunko</LabelText>
                  <Box>
                    <Checkbox defaultChecked disabled />
                    <ResultText>Express PSD2</ResultText>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={4}
          sx={{ mt: "2rem", justifyContent: "stretch" }}
        >
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader title="Dane Kliente" />
              <CardContent>
                <Box style={{ marginBottom: "1rem" }}>
                  <LabelText>Dane spolki</LabelText>
                  <ResultText>Fifth Factor</ResultText>
                  <br />
                  <ResultText>ul. Julio</ResultText>
                  <br />
                  <ResultText>35-060</ResultText>
                  <br />
                  <ResultText>NIP 8123123</ResultText>
                </Box>
                <Box style={{ marginBottom: "1rem" }}>
                  <LabelText>Dane kontow</LabelText>
                  <ResultText>tel. 788 174 9231</ResultText>
                  <br />
                  <ResultText>email. andrii@adad.com</ResultText>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <CardHeader
                      sx={{ width: "max-content", pt: 0 }}
                      title="Dane Fakutry"
                    />
                    <Box>
                      <LabelText>Dane Nabywecy</LabelText>
                      <ResultText>Fifth Factor</ResultText>
                      <br />
                      <ResultText>ul. Julio</ResultText>
                      <br />
                      <ResultText>35-060</ResultText>
                      <br />
                      <ResultText>NIP 8123123</ResultText>
                    </Box>
                    <Box>
                      <LabelText>Dane Nabywecy</LabelText>
                      <ResultText>Fifth Factor</ResultText>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mb: "2rem" }}>
                      <LabelText>Dane Nabywecy</LabelText>
                      <ResultText>Fifth Factor</ResultText>
                    </Box>
                    <Box sx={{ mb: "2rem" }}>
                      <LabelText>Dane Nabywecy</LabelText>
                      <ResultText>Fifth Factor</ResultText>
                    </Box>
                    <Box sx={{ mb: "2rem" }}>
                      <LabelText>Dane Nabywecy</LabelText>
                      <ResultText>Fifth Factor</ResultText>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ mt: "2rem" }}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Zalackzinicky" />
              <CardContent>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                  {1 === null && <Typography>No file selected.</Typography>}
                  {[1, 2].map((el) => (
                    <PdfItem
                      key={el}
                      name={"el.name"}
                      fileType={"el.type"}
                      removeFileFromFileList={() => {
                        return;
                      }}
                      disabled={true}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return null;
  }
};
export default PreviewCard;
