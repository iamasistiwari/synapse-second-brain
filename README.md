# Synapse- Second brain 

[Website-Link](https://synapse.ashishtiwari.net/)

This project is a full-stack application built using **Turborepo** that allows users to create and manage notes. It features a **novel editor** to add notes, auto-fetches metadata from links, stores content in **Supabase PostgreSQL**, and supports **embeddings search** through the content.

## Features

- **Novel Editor**: A rich-text editor for creating and formatting notes.
- **Link Metadata Fetching**: Automatically fetches metadata like title, description, and images from URLs.
- **Storage**: Saves notes and their metadata in a **Supabase PostgreSQL** database.
- **Embeddings Search**: Performs semantic search on notes using vector embeddings for powerful content retrieval.

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/) - React framework for building the web app.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
- **Backend**:
  - [Express.js](https://expressjs.com/) - Web framework for Node.js used to build the backend APIs.
- **Database**:

  - [Supabase](https://supabase.io/) - Open-source backend-as-a-service providing a PostgreSQL database for storing notes.

- **Embeddings & Search**:
  - Integration with **Embeddings** for efficient semantic search.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (>=23.0)
- [pnpm](https://www.pnpm.io/)
- [Supabase](https://supabase.io/) account for database and authentication setup

## Usage

- **Create Notes**: Use the novel editor to write notes. The editor provides rich-text formatting options.
- **Link Metadata**: Paste URLs in the editor to automatically fetch metadata (title, description, images) related to the link.
- **Embeddings Search**: Search for specific content within your notes using the embeddings search feature to find the most relevant results based on semantic meaning.

## Contributing

Feel free to fork this project and submit pull requests. For any feature requests or bugs, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
