$(document).ready(function () {
  let songData = [];
  let pageSize = 25;
  let currentPage = 1;

  // Load data dari JSON
  $.getJSON('/api/data.json', function (data) {
    songData = data;
    updateSongList();
    renderPagination();
  });

  function updateSongList() {
    const searchInput = $('#search-input').val().toLowerCase();
    const filteredData = songData.filter((item) => item.artist.toLowerCase().includes(searchInput) || item.song.toLowerCase().includes(searchInput));

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

    const songList = $('#song-list');
    songList.empty();

    paginatedData.forEach((item) => {
      const songItem = $('<div>').addClass('song-item');

      // Link menuju halaman chords-layout.html dengan parameter
      const songLink = $('<a>')
        .attr({
          href: `chords-layout.html?artist=${encodeURIComponent(item.artist)}&song=${encodeURIComponent(item.song)}&chords=${encodeURIComponent((item.chords || '').trim())}`,
          target: '_blank', // Buka di tab baru
          rel: 'noopener noreferrer', // Keamanan tambahan
        })
        .text(`${item.artist} - ${item.song}`);

      songItem.append(songLink);
      songList.append(songItem);
    });
  }

  $('#search-input').on('input', function () {
    currentPage = 1;
    updateSongList();
    renderPagination();
  });
});
