import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const destDir = path.join(projectRoot, "public", "products");

const srcDir =
  process.env.WIG_ASSETS_DIR ||
  path.join(
    process.env.USERPROFILE || "",
    ".cursor",
    "projects",
    "c-Users-PAUL-ABONGO-Desktop-prompt-MK-GADGET",
    "assets",
  );

const files = [
  "c__Users_PAUL_ABONGO_AppData_Roaming_Cursor_User_workspaceStorage_171ed194ecc9c41d74a5a1bbad6e1533_images_0dd404f3-70fc-45ee-85cf-9efe64fa56bb-0595fbff-aae4-40c7-a572-1450fa41ac70.png",
  "c__Users_PAUL_ABONGO_AppData_Roaming_Cursor_User_workspaceStorage_171ed194ecc9c41d74a5a1bbad6e1533_images_556f0d48-c21f-4978-8ef5-2e1133fd901c-9f78cd27-18de-47af-b7e8-20d0d074cac2.png",
  "c__Users_PAUL_ABONGO_AppData_Roaming_Cursor_User_workspaceStorage_171ed194ecc9c41d74a5a1bbad6e1533_images_58b6e452-51d7-4d27-8c99-15ccff77c169-20fd5bcd-4dbc-421a-b9f1-52a0dd7c2d6d.png",
  "c__Users_PAUL_ABONGO_AppData_Roaming_Cursor_User_workspaceStorage_171ed194ecc9c41d74a5a1bbad6e1533_images_dea47a87-2b56-4d09-a238-e496530aee7c-d61ed724-67eb-43f1-b2f8-21130e0a71b2.png",
  "c__Users_PAUL_ABONGO_AppData_Roaming_Cursor_User_workspaceStorage_171ed194ecc9c41d74a5a1bbad6e1533_images_cc1b7e8f-106b-44dd-ae19-4a6a2e8ff8be-ff642594-16ab-4357-9466-7dc24f3ab8a6.png",
  "c__Users_PAUL_ABONGO_AppData_Roaming_Cursor_User_workspaceStorage_171ed194ecc9c41d74a5a1bbad6e1533_images_741cf3d7-16b4-40c7-b58e-11a7799903e9-8b47869d-bdcd-47b8-9c21-0783f2454f09.png",
  "c__Users_PAUL_ABONGO_AppData_Roaming_Cursor_User_workspaceStorage_171ed194ecc9c41d74a5a1bbad6e1533_images_7fcefbf4-c438-4c95-9222-95d32c04262a-de828482-af26-4961-9358-21d76f5828a5.png",
  "c__Users_PAUL_ABONGO_AppData_Roaming_Cursor_User_workspaceStorage_171ed194ecc9c41d74a5a1bbad6e1533_images_1be60ff1-d6b4-4513-8be7-d06dc5b64f8c-488d2fb5-5d66-4ab1-93ba-7d4957d1b2f0.png",
];

fs.mkdirSync(destDir, { recursive: true });

let ok = 0;
for (let i = 0; i < files.length; i++) {
  const from = path.join(srcDir, files[i]);
  const to = path.join(destDir, `wig-${String(i + 1).padStart(2, "0")}.png`);
  if (!fs.existsSync(from)) {
    console.error("Missing:", from);
    continue;
  }
  fs.copyFileSync(from, to);
  ok++;
  console.log("Copied", to);
}

if (ok !== files.length) {
  console.error(`Expected ${files.length} files, copied ${ok}. Set WIG_ASSETS_DIR to your assets folder.`);
  process.exit(1);
}
