import { Hono } from "hono";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

const app = new Hono().basePath("/api");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
});

app
  .post("/upload", async (c) => {
    const body = await c.req.parseBody();
    const file = body.file as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "nit-marketplace" }, (err, res) => {
          if (err) return reject(err);
          if (!res) return reject(new Error("Upload failed"));
          resolve(res);
        })
        .end(buffer);
    });

    return c.json({ url: result.secure_url });
  })
  .get("/hello", (c) => {
    return c.json({
      message: "hey from hono",
    });
  });

export const POST = (req: Request) => app.fetch(req);
export const GET = (req: Request) => app.fetch(req);
