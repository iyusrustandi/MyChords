$(document).ready(function () {
  // Load modal chord
  $('#modal-placeholder').load('/components/chord-modal.html', function () {
    console.log('Chord modal loaded successfully.');
    console.log('Checking if modal exists:', $('#chord-modal').length);

    // Event listener klik chord
    $(document).on('click', '.chord', function () {
      console.log('Chord clicked:', $(this).text());

      if (!$('#chord-modal').length) {
        console.error('Chord modal is not loaded yet.');
        return;
      }

      const chordName = $(this).attr('data-name') || $(this).text().trim();
      const imgSrc = `/images/chords-library/${chordName}.svg`;

      $('#chord-image').hide();
      $('#chord-message').remove();

      $('#chord-image')
        .attr('src', imgSrc)
        .off('error')
        .on('error', function () {
          console.error(`Image not found: ${imgSrc}`);
          $(this).hide();
          $('<p id="chord-message">Chord not found</p>').appendTo('.modal-content');
        })
        .show();

      $('#chord-modal').fadeIn().css('display', 'flex');
    });

    // Event untuk menutup modal
    $(document).on('click', '.close', function () {
      $('#chord-modal').fadeOut();
    });

    // **Hapus sementara event klik luar modal untuk debugging**
  });
});
