import Block from './Block';

class BlockGrid {
    constructor(width = 10, height = 10) {
        this.width = width;
        this.height = height;
        this.grid = [];

        for (let x = 0; x < this.width; x++) {
            const col = [];
            for (let y = 0; y < this.height; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }
    }

    render(el = document.getElementById('gridEl')) {
        for (let x = 0; x < this.width; x++) {
            const id = 'col_' + x;
            const colEl = document.createElement('div');
            colEl.id = id;
            colEl.className = 'col';
            el.appendChild(colEl);

            for (let y = this.height - 1; y >= 0; y--) {
                const block = this.grid[x][y];
                const id = `block_${x}x${y}`;
                const blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.colour;
                blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
                colEl.appendChild(blockEl);
            }
        }
    }

    blockClicked(e, block) {
        console.log(e, block);
        //Reset removed object.
        this.removed = {};

        this.scanMatchingBoxes(block.x, block.y, block.colour);

        console.log('removed list after click:', this.removed);

        this.moveRemovedBoxesTop(); /* Commenting this line will make it easier to see what blocks are dissaperaing on click */

        this.reRender();
    }

    // As long as colour matches recursively continue scaning in 4 directions.
    scanMatchingBoxes(x, y, colour) {
        // base condition
        if (this.grid[x][y].colour == 'gray' || this.grid[x][y].colour !== colour) {
            return;
        }

        // set colour to gray
        this.grid[x][y].colour = 'gray';

        // track removed boxes in hash table with x key
        if (this.removed[x]) {
            this.removed[x].push(y);
        } else {
            this.removed[x] = [y];
        }

        // scan next right if valid.
        const right = x + 1;
        if (this.grid[right] && this.grid[right][y] && this.grid[right][y].colour === colour) {
            this.scanMatchingBoxes(right, y, colour);
        }
        // scan next left if valid.
        const left = x - 1;
        if (this.grid[left] && this.grid[left][y] && this.grid[left][y].colour === colour) {
            this.scanMatchingBoxes(left, y, colour);
        }
        // scan next top if valid.
        const top = y + 1;
        if (this.grid[x] && this.grid[x][top] && this.grid[x][top].colour === colour) {
            this.scanMatchingBoxes(x, top, colour);
        }
        // scan next bottom if valid.
        const bottom = y - 1;
        if (this.grid[x] && this.grid[x][bottom] && this.grid[x][bottom].colour === colour) {
            this.scanMatchingBoxes(x, bottom, colour);
        }
    }

    moveRemovedBoxesTop() {
        for (let x in this.removed) {
            // Sort the removed colums descending order to keep previous array elements in order.
            this.removed[x].sort((a, b) => b - a);

            // Carry removed (gray) element to top of the array , previous elements will shift by one.
            this.removed[x].forEach((y) => {
                const temp = this.grid[x][y];
                // Remove removed item.
                this.grid[x].splice(y, 1);
                // Push to top of the array. this will be displayed as gray box on top.
                this.grid[x].push(temp);
            });

            // Fix y property order for the whole column. This is required for on click event.
            for (let y = 0; y < this.grid[x].length; y++) {
                this.grid[x][y].y = y;
            }
        }
    }

    reRender() {
        document.getElementById('gridEl').innerHTML = '';
        this.render();
    }

}

export default BlockGrid;