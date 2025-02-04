export default function splitChunks(
  text: string,
  chunkSize: number = 100
): string[] {
  const words = text.split(" ");
  const chunks: string[] = [];
  let currentChunk = "";

  for (const word of words) {
    if (currentChunk.length + word.length + 1 > chunkSize) {
      chunks.push(currentChunk);
      currentChunk = word;
    } else {
      currentChunk += (currentChunk ? " " : "") + word;
    }
  }

  if (currentChunk) chunks.push(currentChunk);
  return chunks;
}
