import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function uploadImage(file: File, folder = "services") {
  if (!file || file.size === 0) {
    throw new Error("No image file provided for upload")
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error)
          return
        }

        if (!result?.secure_url) {
          reject(new Error("Cloudinary upload did not return a secure URL"))
          return
        }

        resolve(result.secure_url)
      }
    )

    stream.end(buffer)
  })
}
