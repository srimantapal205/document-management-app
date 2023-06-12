import { MSGraphClient } from '@microsoft/microsoft-graph-client';
import { graph } from '@pnp/graph';

export async function uploadFileToSharePoint(file) {
  const graphClient = await getGraphClient();
  
  // Create a new folder with the current date
  const currentDate = new Date().toISOString().slice(0, 10);
  const folder = await graphClient.api('/sites/{site-id}/drives/{drive-id}/root/children')
    .post({
      name: currentDate,
      folder: {},
    });
  
  // Upload the file to the created folder
  await graphClient.api(`/sites/{site-id}/drives/{drive-id}/items/${folder.id}/children`)
    .header('Content-Type', 'application/octet-stream')
    .put(file);
}

export async function getFileFromSharePoint(fileId) {
  const graphClient = await getGraphClient();
  
  const file = await graphClient.api(`/sites/{site-id}/drives/{drive-id}/items/${fileId}`)
    .get();
  
  return file;
}

async function getGraphClient() {
  const client = MSGraphClient.init({
    authProvider: (done) => {
      // Implement authentication method (e.g., using Microsoft Authentication Library - MSAL)
      // and obtain an access token for Microsoft Graph API
     // done(null, accessToken);
     console.log(done())
    },
  });

  await graph.setup({
    spfxContext: { msGraphClientFactory: () => client },
  });

  return client;
}
