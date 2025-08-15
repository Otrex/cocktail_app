# Cocktail Land

Cocktail Land is a React project that uses the [TheCocktailDB API](https://www.thecocktaildb.com/api.php)  to let you search for your favorite cocktails and save them to your favorites list.
This is a project that uses theto allow you to search for your favourite cocktail.
It allows you to do the following:

## Features
- Search for cocktails
  - By name
  - By first letter
- Manage favorites
  - Add cocktails to your favorites list

This project uses the following packages:
- React
- Vite
- RTK Query
- Shadcn / Shadcn Io

> This project is also hosted on my Render account.
> Visit https://cocktail-app-89qk.onrender.com to preview

## Requirements

To run this project locally, you'll need to have the following

- NodeJS (preferably version 22 and above)
- Yarn (but any other package manager will do)

## Steps to running the project

Once you have your NodeJS setup on your PC or server, next you'll need to pull the code from the repository to your local device. To do this, you can either download the code or just use the GitHub cloning command.
To use the GitHub command, run:

```
git clone <the-repo-url>
```

Next, install the dependencies by running the following command:

```
npm install
```

or

```
yarn
```

After that, you can then run the project in development mode using the command:

```
npm run dev
```

or

```
yarn dev
```

Another good option is to run it using the preview command. But for you to use this, first run the build command:

```
yarn build
```

or

```
npm run build
```

before running the command

```
yarn preview
```

or

```
npm run preview
```

After that, you'll see the link to the preview url. It's usually `http://localhost:5173`. Click on it or copy the link and paste on your browser URL bar to preview

## Why I Built It This Way
While working on Cocktail Land, I made a bunch of intentional choices — some for performance, some for simplicity, and some just because I knew they’d make my life (and the user’s) easier.

- Pie Charts for Data Visualization<br/>
I went with pie charts because they make proportions instantly understandable. I kept the chart components focused purely on rendering and wrapped them in memo so chartData and configs wouldn’t cause unnecessary re-renders.

- Vitest over Jest<br/>
I picked Vitest simply because it was quicker and easier to set up with Vite. Less time wrestling with configs, more time building features.

- Transforming Data Right After Fetch<br/>
As soon as I got data from the API, I transformed it on the spot. This meant I didn’t have to keep reshaping it in different components later — one clean format from the start.

- Making Images Reliable<br/>
Cocktails look better with pictures, so I added a fallback image in case an image was broken. I also added lazy loading in the CocktailCard so images only load when needed, making things snappier.

- Choosing Context over Redux Toolkit<br/>
I love Redux Toolkit, but here it felt like overkill. Context gave me the state sharing I needed without all the boilerplate. I also built custom hooks (useLocalStorage and useUrlBar) to keep state persistent and in sync with the URL.

- RTK Query for Caching<br/>
While I skipped Redux for state, I still used RTK Query for fetching and caching data. It’s just too good at that job to pass up.

- Saving Full Data for Favorites<br/>
For favorites, I stored the fully transformed cocktail data. This way, I didn’t have to fetch again just to show a preview — it was all ready to go.

- Debouncing the Search<br/>
I built a useDebounceState hook so the search waits 500ms after typing before hitting the API. It keeps things smooth and stops the server from being hammered with requests.

- Dynamic Colors for Pie Charts<br/>
Instead of manually listing chart colors, I made a color generator. One less thing to maintain, and it keeps the visuals fresh.
