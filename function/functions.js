module.exports = {
  assignImg: function(category) {
    const rootPath = '/images/tutorials-page/';
    let imgFile = '';

    switch (category) {
      case 'html/css':
        imgFile = 'html-css.svg';
        break;
      case 'javascript':
        imgFile = 'javascript.svg';
        break;
      case 'react':
        imgFile = 'react.svg';
        break;
      case 'nodejs':
        imgFile = 'nodejs.svg';
        break;
      case 'express':
        imgFile = 'express.svg';
        break;
      case 'mongodb':
        imgFile = 'mongodb.svg';
        break;
    }

    return rootPath + imgFile;
  }
};
