// ==========================Transpose Logic=====================================
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
const flatNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function transposeChords(step) {
  document.querySelectorAll('span[data-name]').forEach((span) => {
    const chord = span.getAttribute('data-name');
    if (!chord) return; // Skip jika data-name kosong

    // Match bagian utama chord dan bass note jika ada
    const match = chord.match(/^([A-G][#b]?)(.*)$/);
    if (!match) return; // Skip jika tidak valid

    const baseChord = match[1]; // Bagian utama chord (C, D#, F, dll.)
    const suffix = match[2]; // Sisanya (misal: m7, /F#, dll.)

    let noteIndex = notes.indexOf(baseChord);
    if (noteIndex === -1) {
      noteIndex = flatNotes.indexOf(baseChord);
      if (noteIndex === -1) return; // Skip jika tidak ditemukan di kedua array
    }

    const transposedIndex = (noteIndex + step + 12) % 12;
    const transposedNote = notes[transposedIndex];

    // Jika chord memiliki bass note (misal D/F#), perlu transpose juga bass note
    const bassMatch = suffix.match(/\/([A-G][#b]?)/);
    if (bassMatch) {
      const bassNote = bassMatch[1];
      let bassIndex = notes.indexOf(bassNote);
      if (bassIndex === -1) {
        bassIndex = flatNotes.indexOf(bassNote);
        if (bassIndex === -1) return; // Skip jika tidak ditemukan di kedua array
      }

      const transposedBassIndex = (bassIndex + step + 12) % 12;
      const transposedBassNote = notes[transposedBassIndex];

      // Ganti bass note yang lama dengan yang baru
      span.textContent = `${transposedNote}${suffix.replace(bassNote, transposedBassNote)}`;
      span.setAttribute('data-name', `${transposedNote}${suffix.replace(bassNote, transposedBassNote)}`);
    } else {
      // Jika tidak ada bass note, langsung ubah chord
      span.textContent = transposedNote + suffix;
      span.setAttribute('data-name', transposedNote + suffix);
    }
  });
}
