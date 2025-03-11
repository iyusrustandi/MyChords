// ==========================Chord Modal=====================================
$(document).ready(function () {
  // Load modal chord
  $('#modal-placeholder').load('/components/chord-modal.html', function () {
    console.log('Chord modal loaded successfully.');

    // Event listener klik chord (gunakan delegation agar dinamis)
    $(document).on('click', '.chord', function () {
      const chordName = $(this).attr('data-name') || $(this).text().trim();
      const imgSrc = `/images/chords-library/${chordName}.svg`;

      // Reset modal content dulu biar bersih
      $('#chord-image').hide(); // Sembunyikan gambar dulu
      $('#chord-message').remove(); // Hapus pesan sebelumnya kalau ada

      // Load gambar
      $('#chord-image')
        .attr('src', imgSrc)
        .off('error') // Bersihkan handler sebelumnya biar ga numpuk
        .on('error', function () {
          console.error(`Image not found: ${imgSrc}`);

          // Ganti gambar dengan teks "Chord not found"
          $(this).hide(); // Sembunyikan gambar
          $('<p id="chord-message">Chord not found</p>').appendTo('.modal-content');
        })
        .show();

      $('#chord-modal').fadeIn();
    });

    // Close modal
    $(document).on('click', '.close', function () {
      $('#chord-modal').fadeOut();
    });

    // Klik luar modal untuk close
    $(window).on('click', function (event) {
      if ($(event.target).is('#chord-modal')) {
        $('#chord-modal').fadeOut();
      }
    });
  });
});
