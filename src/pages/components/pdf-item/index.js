import { default as styled } from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Icon } from "@mui/material";
import { FileDocument } from "mdi-material-ui";

const PdfItemBox = styled(Box)`
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  min-width: 15rem;
  min-height: 15rem;
  min-height: 12rem;
  box-shadow: 0px 0px 2rem 0px #00000017;
`;

const PdfItem = ({ name, removeFileFromFileList, disabled }) => {
  let fileName = name;

  const pdfRegex = new RegExp(/(\.pdf)$/g);

  if (!pdfRegex.test(name)) fileName + ".pdf";

  return (
    <PdfItemBox>
      <Icon sx={{ width: "2rem", height: "2rem" }}>
        <FileDocument
          sx={{ width: "100%", height: "100%", color: "#f97979" }}
        />
      </Icon>
      <Typography>{fileName}</Typography>
      <Button
        disabled={disabled}
        sx={{ borderRadius: "1.125rem", width: "7rem" }}
        variant="contained"
        size="small"
        onClick={(event) => removeFileFromFileList(event, name)}
      >
        Zaapisz
      </Button>
    </PdfItemBox>
  );
};

export default PdfItem;
