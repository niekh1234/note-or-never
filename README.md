<div align="center">

  <h1><span style="color:#D946EF">Note</span> or never</h1>
  
  <p>
    A simple, elegant and self-hosted note-taking app!
  </p>

<!-- Badges -->
  <!-- Todo insert -->

  <h4>
    <a href="https://note-or-never.app/">View Demo</a>
  <span> · </span>
    <a href="https://note-or-never.app/">Documentation</a>
  <span> · </span>
    <a href="https://github.com/niekh1234/note-or-never/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/niekh1234/note-or-never/issues">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [:notebook_with_decorative_cover: Table of Contents](#notebook_with_decorative_cover-table-of-contents)
  - [:star2: About the Project](#star2-about-the-project)
    - [:space_invader: Tech Stack](#space_invader-tech-stack)
    - [:dart: Features](#dart-features)
    - [:key: Environment Variables](#key-environment-variables)
  - [:toolbox: Getting Started](#toolbox-getting-started)
    - [:bangbang: Prerequisites](#bangbang-prerequisites)
    - [:gear: Installation](#gear-installation)
    - [:running: Run Locally](#running-run-locally)
  - [:wave: Contributing](#wave-contributing)
  - [:warning: License](#warning-license)
  - [:handshake: Contact](#handshake-contact)
  - [:gem: Acknowledgements](#gem-acknowledgements)

<!-- About the Project -->

## :star2: About the Project

<div align="center"> 
  <img src="assets/note-or-never.jpg" alt="screenshot" />
</div>

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://nextjs.org/">Next.js</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://nextjs.org/">Next.js api routes</a></li>
    <li><a href="https://www.prisma.io/">Prisma</a></li>    
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
  </ul>
</details>

<!-- Features -->

### :dart: Features

- `PWA`-like experience using background syncing and preemtive updating.
- Fast markdown parsing using `WASM` and a web worker.
- Username-password authentication if setup without a database.
- Modern, clean and response UI using `TailwindCSS` and `Headless UI`
- Great code editing and syntax highlighting using `CodeMirror`
- Fast by design, everything is stored in memory. **But that means it cannot handle thousands of records.**

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` a database url for `prisma`.

`TOKEN_SECRET` for session cookie signing.

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn
```

<!-- Installation -->

### :gear: Installation

Install my-project with npm

```bash
  yarn install my-project
  cd my-project
```

<!-- Run Locally -->

### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/niekh1234/note-or-never.git
```

Go to the project directory

```bash
  cd note-or-never
```

Install dependencies

```bash
  yarn install
```

Build the project

```bash
  yarn build
```

Start the server

```bash
  yarn start
```

Alternatively you can use something like [pm2](https://pm2.keymetrics.io/) to start a service.
Or [read the full installation guide](https://note-or-never.app/installation)

<!-- Contributing -->

## :wave: Contributing

<a href="https://github.com/niekh1234/note-or-never/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=niekh1234/note-or-never" />
</a>

Contributions are always welcome!

<!-- License -->

## :warning: License

Distributed under the Apache 2.0 license. See LICENSE for more information.

<!-- Contact -->

## :handshake: Contact

Niek Hagen - niekhagen@hotmail.com

Project Link: [https://github.com/niekh1234/note-or-never](https://github.com/niekh1234/note-or-never)

<!-- Acknowledgments -->

## :gem: Acknowledgements

- [README.md template used](https://github.com/Louis3797/awesome-readme-template)
