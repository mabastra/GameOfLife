# Conway's Game of Life
[wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)


## To Do List
### Setup
- [X] Create a grid of cells
- [X] Clicking flips status of cell
- [X] Fill in cells based on 2D array of state ('seed')

### Goals
####
- [X] erase board on dismount
- [X] create active/inactive states for buttons based on loop

#### calculate next state
- [X] Check neighbors and follow rules
  -  Any live cell with two or three live neighbours survives.
  -  Any dead cell with three live neighbours becomes a live cell. (reproduction)
  -  All other live cells die in the next generation. (under/over-population)
  -  All other dead cells stay dead
  -  Determine how to handle edge cells with fewer neighbors

- [X] Create lifecycle loop that runs at constant time and changes state with rules

### Extended Goals
- [X] info component (about cellular automata, etc)
- [X] Save current game to localstorage/server
- [X] Load sample starter states
- [ ] User adjustable grid size
- [ ] Two different 'species' on grid (represented by color) 
   -  how do two species interact?
- [ ] Option for edges (Snake style wrap around)
