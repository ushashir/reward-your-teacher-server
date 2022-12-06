import { Readable } from 'stream';

export const getReadableStream = (buffer: Buffer): Readable => {
  const stream = new Readable();

  stream.push(buffer);
  stream.push(null);

  return stream;
};
