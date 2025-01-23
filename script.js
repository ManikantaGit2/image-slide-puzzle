    const puzzleContainer = document.querySelector('.puzzle');
    const imageURL = 'https://www.angroos.com/wp-content/uploads/2024/01/unique-good-night-image.jpg';
    const size = 3; // 3x3 grid
    const tiles = [];

    // Create the puzzle tiles
    function createPuzzle() {
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          const tileIndex = row * size + col;
          const tile = document.createElement('div');
          tile.classList.add('tile');
          tile.style.backgroundImage = `url(${imageURL})`;
          tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
          tile.dataset.index = tileIndex;
          if (tileIndex === size * size - 1) {
            tile.classList.add('empty');
            tile.style.backgroundImage = 'none';
          }
          puzzleContainer.appendChild(tile);
          tiles.push(tile);
        }
      }
      puzzleContainer.addEventListener('click', moveTile);
    }

    // Shuffle the tiles
    function shuffleTiles() {
      const shuffledTiles = tiles.slice().sort(() => Math.random() - 0.5);
      puzzleContainer.innerHTML = '';
      shuffledTiles.forEach(tile => puzzleContainer.appendChild(tile));
    }

    // Move a tile if adjacent to the empty space
    function moveTile(event) {
      const clickedTile = event.target;
      if (!clickedTile.classList.contains('tile') || clickedTile.classList.contains('empty')) return;

      const emptyTile = document.querySelector('.tile.empty');
      const clickedIndex = [...puzzleContainer.children].indexOf(clickedTile);
      const emptyIndex = [...puzzleContainer.children].indexOf(emptyTile);

      const isAdjacent =
        clickedIndex === emptyIndex - 1 ||
        clickedIndex === emptyIndex + 1 ||
        clickedIndex === emptyIndex - size ||
        clickedIndex === emptyIndex + size;

      if (isAdjacent) {
        puzzleContainer.insertBefore(clickedTile, emptyTile);
        puzzleContainer.insertBefore(emptyTile, puzzleContainer.children[clickedIndex]);
      }
    }

    // Initialize the puzzle
    createPuzzle();
