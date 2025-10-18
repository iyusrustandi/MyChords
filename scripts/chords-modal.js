$(document).on('click', '.chord', function () {
  console.log('\n========== CHORD CLICKED ==========');

  // Ambil nama chord dari atribut data-name atau teks
  const chordName = $(this).attr('data-name')?.trim() || $(this).text().trim();
  console.log('🎵 Original chord:', chordName);

  if (!chordName) {
    console.error('❌ Tidak ada nama chord ditemukan');
    return;
  }

  // Konversi: F#M7 → FSharpM7
  const fileName = chordName.replace(/#/g, 'Sharp').replace(/b/g, 'Flat').replace(/\s+/g, '');
  console.log('🪶 Converted fileName:', fileName);

  // Pastikan modal sudah siap
  if (!$('#chord-modal').length || !$('#chord-image').length) {
    console.error('❌ Modal belum siap! Coba klik lagi setelah halaman siap.');
    alert('Modal belum siap. Silakan tunggu sebentar lalu coba lagi.');
    return;
  }

  // Tampilkan modal
  $('#chord-modal').css('display', 'flex').hide().fadeIn(200);

  // Reset isi modal
  $('#chord-message').remove();
  $('#chord-image').hide().attr('src', '');
  $('.modal-content').append('<p id="chord-message" style="margin-top: 15px;">Loading chord...</p>');

  // 🔧 Gunakan fileName (bukan chordName)
  const basePath = `/images/chords-library/${fileName}`;
  console.log('🧩 Base path:', basePath);

  const extensions = ['svg', 'png', 'jpg', 'jpeg'];
  let index = 0;

  function tryNextExtension() {
    if (index >= extensions.length) {
      console.error('❌ Semua format gagal dimuat');
      $('#chord-message').text('Chord not found').css('color', '#e31708');
      return;
    }

    const fullPath = `${basePath}.${extensions[index]}`;
    console.log(`🔍 Attempt ${index + 1}/${extensions.length}: ${fullPath}`);

    const img = new Image();
    img.onload = function () {
      console.log('✅ Image loaded successfully:', fullPath);
      $('#chord-message').remove();
      $('#chord-image')
        .attr('src', fullPath)
        .css({
          display: 'block',
          'max-width': '100%',
          margin: '10px auto',
        })
        .fadeIn(200);
    };
    img.onerror = function () {
      console.warn('❌ Not found:', fullPath);
      index++;
      tryNextExtension();
    };
    img.src = fullPath;
  }

  tryNextExtension();
});
