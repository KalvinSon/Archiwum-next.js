// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Third Party Components
import axios from "axios";

// ** Demo Components Imports
import AddCard from "src/views/apps/applications/add/AddCard";
import AddActions from "src/views/apps/invoice/add/AddActions";
import AddNewCustomers from "src/views/apps/invoice/add/AddNewCustomer";
// ** Third Party Styles Imports
import "react-datepicker/dist/react-datepicker.css";

const ApplicationAdd = ({ apiClientData, invoiceNumber }) => {
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState(apiClientData);
  const toggleAddCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <AddCard
            clients={clients}
            invoiceNumber={invoiceNumber}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            toggleAddCustomerDrawer={toggleAddCustomerDrawer}
          />
        </Grid>
      </Grid>
      <AddNewCustomers
        clients={clients}
        open={addCustomerOpen}
        setClients={setClients}
        toggle={toggleAddCustomerDrawer}
        setSelectedClient={setSelectedClient}
      />
    </>
  );
};

export default ApplicationAdd;
