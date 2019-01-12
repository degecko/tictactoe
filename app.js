new Vue({
    el: '#app',
    
    data: {
        player: 'X',
        winner: null,
        moves: 0,
        matrix: null,
    },

    methods: {
        toggle (row, cell) {
            if (this.toggled(row, cell)) {
                console.log('Already filled', this.matrix[row][cell]);
                return;
            }

            // Fill in the cell.
            this.matrix[row][cell] = this.player;

            // Check to see if this is a winning move.
            this.check(row, cell);

            // Switch the player.
            this.player = this.player === 'X' ? '0' : 'X';

            this.moves += 1;
        },

        toggled (row, cell) {
            return this.matrix[row][cell] !== null;
        },

        check (row, cell) {
            let i,
                rowI = 0,
                cellI = 0,
                fDiagI = 0,
                bDiagI = 0,
                matrix = this.matrix,
                ml = matrix.length,
                isInsideDiagonal = [0, row, ml - cell, ml - 1].includes(cell) || [0, cell, ml - row, ml - 1].includes(row);

            // Check the rows and columns.
            for (i = 0; i < ml; i++) {
                (matrix[row][i] === this.player) && rowI++;
                (matrix[i][cell] === this.player) && cellI++;
            }

            if (rowI === ml || cellI === ml) {
                this.winner = this.player + '';
            }

            // Check the diagonals for.
            if (isInsideDiagonal) {
                for (i = 0; i < ml; i++) {
                    for (let j = 0; j < ml; j++) {
                        if (i === j) {
                            (matrix[i][j] === this.player) && fDiagI++;
                            (matrix[i][ml - j - 1] === this.player) && bDiagI++;
                        }
                    }
                }

                if (fDiagI === ml || bDiagI === ml) {
                    this.winner = this.player + '';
                }
            }
        },

        reset () {
            const hash = location.hash.substr(1);
            const size = Math.max(2, isNaN(hash) || ! hash ? 3 : parseInt(hash));

            this.matrix = [];

            for (let i = 0; i < size; i++) {
                this.matrix[i] = [];

                for (let j = 0; j < size; j++) {
                    this.matrix[i][j] = null;
                }
            }

            this.player = 'X';
            this.winner = null;
            this.moves = 0;
        },
    },

    watch: {
        moves () {
            if (this.moves === Math.pow(this.matrix.length, 2)) {
                this.winner = 'Nobody';
            }
        },
    },

    beforeMount () {
        this.reset();
    },
});