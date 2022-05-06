# A simple self-hosted markdown note taking app

### Requirements

- I want this note taking app to be a webapp that can be self-hosted
- There should be username password authentication so that only I can read, edit and use the application
- The notes should be able to be written in markdown language
- I want the markdown preview to be fast and and not update once every second, press and key and see instant results.
- The markdown preview should be able to handle large ~10.000 line markdown files without performance issues
- You should be able to add images to your notes, simply by pasting them for example.
- There should be the ability to full text search notes. I'm thinking of doing this client side only using a Rust library

### Technologies

- `NextJS` as the React framework of choice, using API routes to interact with the DB
- `Rust (wasm)` for parsing markdown into html using `rust-pulldown-cmark` and
- `Postgres` as the DB
- `Prisma` as the ORM- `Tailwindcss` for styling
- `CodeMirror` for a clean editor
- `Passport` for authentication. I initially wanted to use NextAuth but I prefer having more control
- `React Query` to query the data from /api

### Learning objectives

I have included a couple of technologies that I've never worked with before to get familiar with them for a future job

- Get familiar with Redux toolkit as that seems to be the store of choice. I do have some experience with the context api and `Zustand` but I've seen that the context api is not meant for large stores and `Zustand` seems to be less popular.
- Get familiar with `WASM`. My Rust is not fantastic, but it does not have to be as I only need to create a wrapper for `pulldown-cmark`.
- Use a web worker.
- Learn to test my code, I've heard cypress and jest are good ways for unit/integration testing but I've never written a test in my life. To be honest I don't see the point for single-person projects like this but I guess forcing myself to write tests better change my mind.
