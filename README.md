# Autonomous World Hackathon - OpenAR

Repo for OpenAR an open sandbpx for created augmented worlds in augmented reality
![Logo](assets/openar-banner.jpg)

## Project Description

Inspired by a love of nature and the physical environment. OpenAR is a platform centered on enabling people and communities to create their own sandbox to create any experiences they can imagine in a spatial world. Users are able to create worlds bounded or infinite that others and themselves can then claim spaces on and assign different tile based games from as simple as tic-tac-toe to as complex as chess and honestly any type of logic you own the space.

Users own their space so whatever logic they want to apply they are free to. If they want to augment tic-tac-toe and play a 9 space match or spice things up in chess and use custom NFTs as pieces, the possibilities are endless.

OpenAR as the name is implies is focused on augmented reality experiences and to showcase that element users are able to play these games in AR with the 1st game tic-tac-toe and being able to visual multiple games occurring.

The future of AR and spatial experiences is bright in our mind and with MUD it truly enables a way to build these physical experiences while maintaining autonomy and ownership. Our next focus is on enabling ZK for privacy which opens the door to more physical based application with AR, such as Pokemon Go gardening and things of that nature.

## How It's Made

Made with love, care, and mud.

There are 3 core parts to the platform.

The OpenAR namespace with systems that enable a user to create a world, claim a space, transfer ownership, and enable a game system to write to individual spaces within the space. Spaces are able to be owned by and address, NFT token, or system and can write whatever data needed into a list of bytes. An array being chosen so multiple game pieces can be associated with a single space like a graveyard in Chess.

![OpenAR](assets/cube-architecture.jpg)

Next is the game namespaces (tic-tac-toe and checkers) that are pure game driven systems that apply their game logic to spaces they are given ownership owner when transferred. They are able to set spaces within spaces they control for the purpose of a game.

![TicTacToe](assets/tictactoe-architecture.jpeg)
![Checkers](assets/checkers-architecture.jpeg)

Lastly is the interface built with a focus around Augmented Reality and enabling users to experience these classic games in a physical space. User are able to play their own match and also spectate other occurring games on a world. It's building use WebXR enabling access to all who have a browser and no app store needed.

These 3 aspects combine to create a unique and fully permission-less experience that has a ton of potential for future spatial use case especially those in the physical world.

We're focused on showcasing eh potential of multiplatform games on chain especially with Augmented Reality via the browser. Creating a fully deecentralized experience and ownership of the game. Our goal with the 1st set of features is to show the full flow of experience from joining your team, playing and winning a game earning prestige for your team and a collectible to share with friends and family.

## Features

- Users claim their space space which they can apply game logic from another MUD namespace (tic-tac-toe, checkers, etc.)
- A 3D world shows active games being played and their state with the ability to claim open spaces
- User if playing tic-tac-toe selects their creature Rolly Polly (O) or Dragonfly (X)
- Games can then be played in 2D or Augmented Reality with the user able to visual multiple games.

## What's next?

Mud opens up the spatial world and the ability to create experiences that can happen in the physical world autonmously. There's so much potential to create a whole ecosystem of games full decentralized from back to frontend that can be augmented as the tech develops especially in the ZK and AI space. The real utility comes from the ability to create experiences that not only take place in the physical world but also allow users to learn and share our knowledge, such as on image identification of plants with ZK-ML that can be used in a educational setting for a scavenger hunt where you compete to find the most plants in a space based structure.

- Settle on Core Primitives and introduce the Cube (Y axis track different games over time)
- Expand the game namespaces to accommodate more tile based games (Uno, Checkers, Marvel Snap) and physical interaction in real spaces.
- Add in more AI driven features to power dynamic world, space behavior exploring how neighboring spaces/games can connect with each other, visually be outputted in AR, and extended with AI. (Roller Coaster Tycoon esque ideas come to mind.)
- Use AI to analyze worlds, spaces, and spaces to derive and generate outputs such as art with stable diffusion
- Add Pokemon esque deck functionality that user treat as pieces for different games, Pikachu as the Knight in Chess, etc.
- ZK added for my privacy driven functionality enabling worldping spaces to the real world

## Getting Started

To run this repo you'll need a few things

1. **git** [download](https://git-scm.com/downloads) opens in a new tab
2. **foundry** (forge, anvil, cast) [download](https://book.getfoundry.sh/getting-started/installation), make sure to foundryup at least once)
3. **node.js** (v16+) [download](https://nodejs.org/en/download/)
4. **pnpm**: after installing node: `npm install --global pnpm`

#### Windows Steps

1. install git bash (gitforwindows.org)
2. install nodejs, including “native modules” (nodejs.org/en/download) (re native modules: just keep the checkmark, it’s enabled by default in the installer)
3. Install foundry via foundryup using Git bash

### Starting

To start the project run: `pnpm run dev`

You should see this if all things went well
![Dev Terminal for MUD development](https://v2.mud.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fquick-start-mud-cli.f66792ef.png&w=1200&q=75)

After deployment is successful, pop over to the web client which if port `3000` is open it is using (localhost)(http://localhost:3000/) and checkout your live app. When you visit you’ll see an increment button and dev tools open in the right-hand panel. Try clicking the button and seeing what updates in the dev tools!

## Contact Information

## Video Link
