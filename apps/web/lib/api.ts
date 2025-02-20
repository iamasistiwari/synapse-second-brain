export default function getAPI(): string {
  const NODE_ENV = process.env.NODE_ENV!;
  if (NODE_ENV === 'production') {
    return `https://api-synapse.ashishtiwari.net`;
  } else {
    return `http://localhost:3001`;
  }
}
