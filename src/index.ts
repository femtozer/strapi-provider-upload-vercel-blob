import { del, put } from "@vercel/blob";
import type { ReadStream } from "node:fs";

interface InitOptions {
  vercelBlobReadWriteToken: string;
}

interface File {
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  path?: string;
  provider?: string;
  provider_metadata?: Record<string, unknown>;
  stream?: ReadStream;
  buffer?: Buffer;
}

module.exports = {
  init: ({ vercelBlobReadWriteToken }: InitOptions) => {
    return {
      async uploadStream(file: File) {
        const blob = await put(file.name, file.stream, {
          access: "public",
          token: vercelBlobReadWriteToken,
        });
        file.url = blob.url;
      },
      async upload(file: File) {
        const blob = await put(file.name, file.buffer, {
          access: "public",
          token: vercelBlobReadWriteToken,
        });
        file.url = blob.url;
      },
      async delete(file: File) {
        await del(file.url, { token: vercelBlobReadWriteToken });
      },
    };
  },
};
