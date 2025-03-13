$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const artist = urlParams.get('artist');
  const song = urlParams.get('song');
  let chordFile = urlParams.get('chords');

  if (chordFile) {
    chordFile = chordFile.trim();
  }

  if (artist && song) {
    document.title = `${artist} - ${song} | MyChords`;
    $('#chord-title').text(`${artist} - ${song}`);
  } else {
    document.title = 'Chords Viewer | MyChords';
    $('#chord-title').text('Chords Viewer');
  }

  if (!chordFile) {
    console.error('Chords file URL is missing.');
    $('#chord-content').html('<p style="color: red;">No chords file specified.</p>');
    $('#loading').addClass('hidden');
    $('#chord-content').removeClass('hidden');
    return;
  }

  const isAbsoluteUrl = chordFile.startsWith('http') || chordFile.startsWith('//');
  const chordsUrl = isAbsoluteUrl ? chordFile : `../${chordFile}`;

  $.ajax({
    url: chordsUrl,
    method: 'GET',
    dataType: 'html',
    beforeSend: function () {
      $('#loading').removeClass('hidden');
      $('#chord-content').addClass('hidden');
      $('#transpose-container').addClass('hidden');
    },
    success: function (data) {
      $('#chord-content').html(data);
      $('#loading').addClass('hidden');
      $('#chord-content').removeClass('hidden');
      $('#transpose-container').removeClass('hidden'); // Tampilkan tombol transpose setelah data dimuat
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Failed to load chords:', chordsUrl, textStatus, errorThrown);
      $('#chord-content').html(`
        <p style="color: red;">
          Failed to load chords file.<br>
          <strong>File:</strong> ${chordsUrl}<br>
          <strong>Status:</strong> ${jqXHR.status} (${textStatus})
        </p>
      `);
      $('#loading').addClass('hidden');
      $('#chord-content').removeClass('hidden');
    },
  });
});
