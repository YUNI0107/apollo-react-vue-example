import { createWriteStream } from "fs"
import { resolve } from "path"
import { sync } from "mkdirp"
import { generate } from "shortid"
import { db } from "./db"

const uploadDir = resolve(__dirname, "../../live/uploads")

// Ensure upload directory exists
sync(uploadDir)

const storeUpload = async ({ filename }) => {
  const id = generate()
  const file = `${id}-${filename}`
  const path = `${uploadDir}/${file}`
  const urlPath = `files/${file}`

  return new Promise((resolve, reject) => {
    // Fix the deprecated in this function
    const stream = createWriteStream(path)

    // The 'finish' event is emitted after the stream.end() method
    // Node official article: https://nodejs.org/api/stream.html#writable-streams
    stream.end("END")
    stream.on("finish", () => resolve({ id, path: urlPath }))
    stream.on("error", (error) => reject(error))
  })
}

const recordFile = (file) => db.get("uploads").push(file).last().write()

export async function processUpload(file) {
  const { filename, mimetype, encoding } = await file
  const { id, path } = await storeUpload({ filename })
  return recordFile({ id, filename, mimetype, encoding, path })
}
