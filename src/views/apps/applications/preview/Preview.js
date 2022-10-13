// ** React Imports
import { useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

// ** Demo Components Imports
import PreviewCard from "src/views/apps/applications/preview/PreviewCard";

const ApplicationPreview = ({ id }) => {
  const [error, setError] = useState(false);

  // @TODO: Get data to check here
  if (true) {
    return <PreviewCard data={{ data: "" }} />;
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity="error">
            Invoice with the id: {id} does not exist. Please check the list of
            invoices: <Link href="/apps/invoice/list">Invoice List</Link>
          </Alert>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default ApplicationPreview;
