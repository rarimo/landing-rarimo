export const handleNavClick = (link, callback) => {
  const linkElement = document.createElement('a');

  if (link.hash) {
    linkElement.href = `#${link.path}`;
    linkElement.click();
    callback?.();
    return;
  }

  if (link.external) {
    linkElement.href = link.path;
    linkElement.target = '_blank';
    linkElement.rel = 'nofollow noopener noreferrer';
    linkElement.click();
    return;
  }
};
