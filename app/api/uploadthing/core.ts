import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth()
  console.log(userId)
  if (!userId) throw new Error("Unauthorized")
  return { userId: userId }
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => { console.log(metadata, file) }),
  messageFile: f(["image", "pdf", "video"])
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => { console.log(metadata, file) })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;