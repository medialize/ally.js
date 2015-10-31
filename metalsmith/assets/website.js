// map languages for prism
[].forEach.call(document.querySelectorAll('pre > code'), function(element) {
  element.className = element.className
    .replace('language-sh', 'language-bash')
    .replace('language-html', 'language-markup')
    .replace('language-js', 'language-javascript');
});