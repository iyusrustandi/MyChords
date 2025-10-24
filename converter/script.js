function formatChords() {
  const input = document.getElementById('inputText').value;
  if (!input.trim()) {
    alert('Please enter some lyrics with chords!');
    return;
  }

  const formattedHTML = processLyrics(input);
  document.getElementById('outputHTML').value = formattedHTML;
  document.getElementById('previewContainer').innerHTML = formattedHTML;
}

function processLyrics(input) {
  const lines = input.split('\n');
  let result = '<div class="lyric">\n  <pre>';
  let inReff = false;
  let reffContent = '';
  let inSectionTitle = false;
  let sectionTitleContent = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Check if line starts with section markers (Intro, Outro, Interlude, Bridge)
    if (/^(Intro|Outro|Interlude|Bridge)\s*:/i.test(trimmedLine)) {
      // Close any open reff
      if (inReff) {
        result += formatReffSection(reffContent);
        reffContent = '';
        inReff = false;
      }
      // Start section title collection
      inSectionTitle = true;
      sectionTitleContent = processChords(line) + '\n';
      continue;
    }

    // If we're collecting section title lines
    if (inSectionTitle) {
      // Check if this line is empty or starts lyrics (has dots or lowercase start)
      if (trimmedLine === '' || /^\.\./.test(trimmedLine) || /^[a-z]/.test(trimmedLine)) {
        // Close the section title
        result += '<span class="section-title">\n' + sectionTitleContent + '</span>\n';
        inSectionTitle = false;
        sectionTitleContent = '';

        // Process the current line normally
        if (trimmedLine === '') {
          result += '\n';
        } else {
          result += processChords(line) + '\n';
        }
        continue;
      } else {
        // Continue adding to section title
        sectionTitleContent += processChords(line) + '\n';
        continue;
      }
    }

    // Check if this is a Reff/Chorus line
    if (/^(Reff|Chorus)$/i.test(trimmedLine)) {
      // Close any previous reff
      if (inReff) {
        result += formatReffSection(reffContent);
        reffContent = '';
      }
      inReff = true;
      reffContent += '<b>' + trimmedLine + '</b>\n';
      continue;
    }

    // If we're in a reff section
    if (inReff) {
      // Check if we hit an empty line or section marker - end reff
      if (trimmedLine === '' || /^(Intro|Outro|Interlude|Bridge)\s*:/i.test(trimmedLine)) {
        result += formatReffSection(reffContent);
        reffContent = '';
        inReff = false;

        if (trimmedLine === '') {
          result += '\n';
          continue;
        } else {
          // Start new section title
          inSectionTitle = true;
          sectionTitleContent = processChords(line) + '\n';
          continue;
        }
      }
      // Add line to reff content
      reffContent += processChords(line) + '\n';
    } else {
      // Regular line (not in reff)
      if (trimmedLine === '') {
        result += '\n';
      } else {
        result += processChords(line) + '\n';
      }
    }
  }

  // Close any remaining section title
  if (inSectionTitle) {
    result += '<span class="section-title">\n' + sectionTitleContent + '</span>\n';
  }

  // Close any remaining reff
  if (inReff) {
    result += formatReffSection(reffContent);
  }

  result += '</pre>\n</div>';
  return result;
}

function formatReffSection(content) {
  return '<span class="reff">\n' + content + '</span>\n';
}

function processChords(text) {
  // Pattern to match chords: A-G followed by optional modifiers
  // Using lookahead/lookbehind to avoid word boundaries that don't work with #
  const chordPattern = /(?:^|\s)([A-G][#b]?(?:maj|min|m|M|\+|-|dim|aug|sus|add)?[0-9]*(?:[-+][0-9]+)?(?:\/[A-G][#b]?)?)(?=\s|$|[^A-Za-z0-9#b+\-/])/g;

  return text.replace(chordPattern, (match, chord) => {
    // Keep the original chord notation for both data-name and display
    const chordSpan = `<span data-name="${chord}" class="chord">${chord}</span>`;
    return match.replace(chord, chordSpan);
  });
}

function clearAll() {
  document.getElementById('inputText').value = '';
  document.getElementById('outputHTML').value = '';
  document.getElementById('previewContainer').innerHTML = '<div class="empty-state">Your formatted chords will appear here</div>';
}

function copyToClipboard() {
  const outputHTML = document.getElementById('outputHTML');
  if (!outputHTML.value.trim()) {
    alert('Nothing to copy! Please format some chords first.');
    return;
  }

  outputHTML.select();
  outputHTML.setSelectionRange(0, 99999);

  try {
    document.execCommand('copy');
    const successMsg = document.getElementById('copySuccess');
    successMsg.style.display = 'block';
    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 2000);
  } catch (err) {
    alert('Failed to copy. Please select the text manually and copy.');
  }
}

// Auto-format on input change
document.addEventListener('DOMContentLoaded', function () {
  const inputText = document.getElementById('inputText');

  inputText.addEventListener('input', function () {
    const input = this.value;
    if (input.trim()) {
      const formattedHTML = processLyrics(input);
      document.getElementById('outputHTML').value = formattedHTML;
      document.getElementById('previewContainer').innerHTML = formattedHTML;
    } else {
      document.getElementById('outputHTML').value = '';
      document.getElementById('previewContainer').innerHTML = '<div class="empty-state">Your formatted chords will appear here</div>';
    }
  });
});
