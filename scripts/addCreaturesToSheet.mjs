import dotenv from "dotenv";
import ExifReader from "exifreader";

import { drive } from "@googleapis/drive";
import { sheets } from "@googleapis/sheets";
import { GoogleAuth } from "google-auth-library";

dotenv.config();

const creatures = [
  {
    name: "Dragonfly",
    element: "Water",
  },
  {
    name: "Water Strider",
    element: "Water",
  },
  {
    name: "Earthworm",
    element: "Earth",
  },
  {
    name: "Ant",
    element: "Earth",
  },
  {
    name: "Grasshopper",
    element: "Earth",
  },
  {
    name: "Rolypoly",
    element: "Earth",
  },
  {
    name: "Spider",
    element: "Fire",
  },
  {
    name: "Firefly",
    element: "Fire",
  },
  {
    name: "Butterfly",
    element: "Air",
  },
  {
    name: "Bee",
    element: "Air",
  },
  {
    name: "Dune Beetle",
    element: "Air",
  },
];

async function addCreaturesToSheet() {
  const auth = new GoogleAuth({
    keyFile: "scripts/wefa-app-creds.json",
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  const driveClient = drive({
    version: "v3",
    auth,
  });

  const sheetsClient = sheets({
    version: "v4",
    auth,
  });

  // const folderName = "creatures";
  // const sheetName = "Creature Generation Classification";
  const spreadsheetId = "15Xp6qw1H2uxweA801xChRd-JsJU8lE_N1LQ9uCQ-YOc";

  creatures.forEach(async (creature) => {
    const folder = await driveClient.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and trashed=false and name ='${creature.name}'`,
      fields: "nextPageToken, files(id, name)",
      spaces: "drive",
    });

    const files = await driveClient.files.list({
      q: `mimeType='image/png' and trashed=false and '${folder.data.files[0].id}' in parents`,
      fields:
        "nextPageToken, files(id, name, thumbnailLink, createdTime, modifiedTime)",
      spaces: "drive",
    });

    let values = [];

    for (let i = 0; i < files.data.files.length; i++) {
      const file = files.data.files[i];

      const image = file.thumbnailLink.replace("=s220", "");

      const metadata = await ExifReader.load(image);

      // Columns - A: Title, B: Image, C: Prompt, D: Created At, E: Element
      values = [
        ...values,
        [
          file.name,
          `=IMAGE("${image}")`,
          metadata["parameters"].value,
          file.createdTime,
          "TBD",
          "TBD",
        ],
      ];
    }

    await sheetsClient.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: `${creature.name}!A:D`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });
  });
}

addCreaturesToSheet();
