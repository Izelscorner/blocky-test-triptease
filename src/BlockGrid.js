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
        this.removed = [];
        this.scanConnectedElement(block.x, block.y, block.colour);

        this.reOrderArray();
        this.reRender();
    }

    reOrderArray() {
        while (this.removed.length) {
            const current = this.removed.pop();
            const temp = this.grid[current.x][current.y];
            this.grid[current.x].splice(current.y, 1);
            this.grid[current.x].push(temp);
            let index = 0;
            this.grid[current.x].forEach(box => {
                box.y = index;
                box.removed = false;
                index++;
            })
        }
    }
    reRender() {
        document.getElementById('gridEl').innerHTML = '';
        this.render();
    }

    scanConnectedElement(x, y, colour) {
        // base conditions;

        if (!this.grid[x][y] || this.grid[x][y].removed) {
            return;
        }

        if (this.grid[x][y].colour === colour) {
            this.grid[x][y].removed = true;
            this.grid[x][y].colour = 'gray';
            console.log('removed', x, y);
            this.removed.push({ x, y });
        } else {
            return;
        }
        // base conditions;


        // scan next right
        const right = x + 1;
        if (this.grid[right] && this.grid[right][y] && this.grid[right][y].colour === colour) {
            this.scanConnectedElement(right, y, colour);
        }
        // scan next  left
        const left = x - 1;
        if (this.grid[left] && this.grid[left][y] && this.grid[left][y].colour === colour) {
            this.scanConnectedElement(left, y, colour);
        }
        // scan next  top
        const top = y + 1;
        if (this.grid[x] && this.grid[x][top] && this.grid[x][top].colour === colour) {
            this.scanConnectedElement(x, top, colour);
        }
        // scan next  bottom
        const bottom = y - 1;
        if (this.grid[x] && this.grid[x][bottom] && this.grid[x][bottom].colour === colour) {
            this.scanConnectedElement(x, bottom, colour);
        }
    }
}

export default BlockGrid;