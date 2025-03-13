let allSongs = []; // Menyimpan semua data lagu

// Fungsi untuk mengambil data dari JSON
async function fetchSongs() {
  try {
    const response = await fetch('/api/data.json'); // Ambil data dari JSON
    const data = await response.json();

    allSongs = data; // Simpan ke variabel global
    displaySongs(allSongs.slice(0, 25)); // Tampilkan hanya 25 data pertama
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Fungsi untuk menampilkan lagu
function displaySongs(songs) {
  const songList = document.getElementById('song-list');
  songList.innerHTML = ''; // Kosongkan daftar sebelum menambahkan data baru

  songs.forEach((item) => {
    const songItem = document.createElement('div');
    songItem.classList.add('song-item');

    // Bersihkan dan validasi URL chords
    const cleanChords = (item.chords || '').trim();

    // Selalu arahkan ke chords-layout.html, baik untuk URL internal maupun eksternal
    const chordLink = `chords-layout.html?artist=${encodeURIComponent(item.artist)}&song=${encodeURIComponent(item.song)}&chords=${encodeURIComponent(cleanChords)}`;

    songItem.innerHTML = `<a href="${chordLink}">${item.artist} - ${item.song}</a>`;
    songList.appendChild(songItem);
  });
}

// Fungsi untuk memfilter lagu berdasarkan input pencarian
function filterSongs() {
  const searchText = document.getElementById('search-input').value.toLowerCase();
  const filteredSongs = allSongs.filter((song) => song.artist.toLowerCase().includes(searchText) || song.song.toLowerCase().includes(searchText));

  displaySongs(filteredSongs.slice(0, 25)); // Batasi tampilan 25 data pertama
}

// Event listener untuk pencarian
document.getElementById('search-input').addEventListener('input', filterSongs);

// Jalankan fetchSongs saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchSongs);
