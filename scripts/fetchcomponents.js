$.get('/components/navbar.html', function (data) {
  $('#nav-placeholder').replaceWith(data);
});

$.get('/components/footer.html', function (data) {
  $('#footer-placeholder').replaceWith(data);
});

$.get('/components/transposebutton.html')
  .done(function (data) {
    $('#transposebutton').replaceWith(data);
  })
  .fail(function () {
    console.error('Failed to load transposebutton.html');
  });
