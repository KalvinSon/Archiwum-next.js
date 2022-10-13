// ** Mock Adapter
import mock from "src/@fake-db/mock";

const data = { applications: [] };

mock.onPost("/apps/applications/create").reply((config) => {
  const data = JSON.parse(config.data);
  try {
    data.applications.push(data);
    return [200, { data: data.applications[data.applications.lenght - 1] }];
  } catch (e) {
    return [500, { error: "Could not create applications" }];
  }
});
