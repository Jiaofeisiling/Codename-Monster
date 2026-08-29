import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { dbConnect } from "./index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupRoot = path.join(repoRoot, "data", "backups", stamp);

function serializeDocs(docs) {
  return JSON.stringify(
    docs,
    (_, value) => {
      if (value && typeof value === "object") {
        if (value._bsontype === "ObjectId" || value._bsontype === "ObjectID") {
          return value.toString();
        }
        if (typeof value.toHexString === "function" && value.id) {
          return value.toString();
        }
      }
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    },
    2
  );
}

async function copyDirIfExists(from, to) {
  if (!fs.existsSync(from)) {
    return 0;
  }
  fs.cpSync(from, to, { recursive: true });
  const files = fs.readdirSync(to, { recursive: true });
  return files.length;
}

async function dump() {
  await dbConnect();
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Mongo connection is not ready.");
  }

  const collectionsDir = path.join(backupRoot, "collections");
  fs.mkdirSync(collectionsDir, { recursive: true });

  const collections = await db.listCollections().toArray();
  const manifest = {
    exportedAt: new Date().toISOString(),
    database: db.databaseName,
    collections: [],
  };

  for (const { name } of collections.sort((a, b) => a.name.localeCompare(b.name))) {
    const docs = await db.collection(name).find({}).toArray();
    fs.writeFileSync(path.join(collectionsDir, `${name}.json`), serializeDocs(docs), "utf8");
    manifest.collections.push({ name, count: docs.length });
    console.log(`exported ${name}: ${docs.length}`);
  }

  const receiptsCopied = await copyDirIfExists(
    path.join(repoRoot, "data", "receipts"),
    path.join(backupRoot, "receipts")
  );
  manifest.receiptFiles = receiptsCopied;

  fs.writeFileSync(path.join(backupRoot, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  console.log(`backup written to ${backupRoot}`);

  await mongoose.disconnect();
}

dump().catch(async (error) => {
  console.error("Dump failed:", error.message);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore
  }
  process.exit(1);
});
