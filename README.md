# Blocky Puzzle

## To get started

You will need a recent version of [Node]. If you do not have it installed already, we find [nvm] to be a handy script to install and even juggle between versions of Node without too much hassle.

On most projects, we have transitioned into using [Yarn], Facebook's package manager in favour of npm. Either one will do to install and run this project, as well as run its tests.

```sh
yarn
# or `npm install`
yarn start
# or `npm start`
```

`http://localhost:9100/` will open automatically on the blocky app, live-reloading as you develop.

Use `yarn test` to run the unit tests on the terminal. `yarn test --watch` will only run test files relevant to changes since your last commit, and rerun them every time you save.

## Solution

My approach recursively searches for neighbouring boxes, updates this.grid array and re-renders the grid. It also moves tracked boxes to top and rearranges the order of columns. Recursive search keeps track of already passed paths for performance optimization (memoization).

One improvement I can see to my solution is, to avoid re-rendering of whole grid on each click direct dom traversal and manipulation could be used,  but for the sake of exercise I kept it clean and tested for up (100 X 100 - 2d array) both rendering and color match scan works ok as I expected.
