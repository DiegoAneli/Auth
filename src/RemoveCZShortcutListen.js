import { useEffect } from 'react';

const RemoveCZShortcutListen = () => {
  useEffect(() => {
    const bodyElement = document.querySelector('body');
    if (bodyElement && bodyElement.hasAttribute('cz-shortcut-listen')) {
      bodyElement.removeAttribute('cz-shortcut-listen');
    }
  }, []);

  return null;
};

export default RemoveCZShortcutListen;
