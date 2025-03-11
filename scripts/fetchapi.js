document.addEventListener('DOMContentLoaded', function () {
  // Memuat daftar lagu dari JSON
  fetch('/api/data.json')
    .then((response) => response.json())
    .then((data) => {
      const listContainer = document.getElementById('song-list');
      const maxItems = 10; // Batasi jumlah data yang ditampilkan
      data.slice(0, maxItems).forEach((item) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = 'chordslayout.html';
        link.textContent = `${item.artist} - ${item.song}`;
        listItem.appendChild(link);
        listContainer.appendChild(listItem);
      });
    })
    .catch((error) => console.error('Error fetching data:', error));
});
