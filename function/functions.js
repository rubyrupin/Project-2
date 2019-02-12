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
  },

  assignColor: function assignColor(category) {
    switch (category) {
      case 'html/css':
      case 'react':
      case 'mongodb':
      case 'express':
        return 'text-white';
      case 'javascript':
      case 'nodejs':
        return 'text-black';
    }
  }
};
