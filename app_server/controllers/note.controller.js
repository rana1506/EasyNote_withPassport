const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
}
/* GET Home page */
const home = (req, res) => {
    res.render('home', { title: 'Home' });    
};

/* GET About page */
const about = (req, res) => {
    res.render('about', { title: 'About', content: 'aaaaaaaaaaaaaaaaaaaaa\nkkkkkkkkkkkkkkkkkkkaaaaaaaaaaaaaaaaaa' });    
};

/* GET Add new note page */
const doAddReview = (req, res) => {
    const path = `/api/notes/`;
    const postdata = {
        title: req.body.title,
        content: req.body.note
    };
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postdata
    };
    if (!postdata.title || !postdata.content ) {
        res.redirect(`/server/notenew/`);
    } else {
        request(
            requestOptions,
          (err, {statusCode}, {name}) => {
              if (statusCode === 201) {
                  console.log('statusCode === 201');
                  res.redirect(`/server/home`);
              } else if (statusCode === 400 && name && name === 'ValidationError') {
                console.log('statusCode === 400');
                  res.redirect(`/server/home`);
              } else {
                  console.log('statusCode === other error');
                  console.log(statusCode);
                  res.redirect(`/server/home`);
                  //showError(req, res, statusCode);
              }
          }
        );
    }
};
const addnote = (req, res,next) => {
      console.log(req.body.title);
      const path = `/api/notes/`;
    const requestOptions = 
    {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: {},
        title: req.body.title,
        content: req.body.content
    };

    request(
        requestOptions,
        (err, {statusCode}, body) => { 
          let data = [];
          
          if (statusCode === 200 ) {
            data=body;
          }        
          //renderPage_NoteInfo(req, res, body);
        }
    );
      home(req,res);
};
/* GET New note page */
const notenew = (req, res) => {
    renderPage_Notenew(res);  
};
const renderPage_Notenew = (res) => {
  
  res.render('note-new',
    {
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: {
        title: 'Create Note'
      }
    }
  );
};
/* GET Note info  page */
const noteinfo = (req, res) => {
    //const path = '/api/notes/'+'5e90d32ffd90a12100bb28a7';
    const path = `/api/notes/${req.params._id}`;
    const requestOptions = 
    {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}        
    };

    request(
        requestOptions,
        (err, {statusCode}, body) => { 
          let data = [];
          
          if (statusCode === 200 ) {
            data=body;
          }        
          renderPage_NoteInfo(req, res, body);
        }
    );
};

const renderPage_NoteInfo = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    //message = 'API lookup error';
    //responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No places found nearby';
    }
  }
  res.render('note-info',
    { 
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: {
        title: responseBody.title,
        strapLine: 'Wonderful place to visit!'
      },
      sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
      locations: responseBody,
      message
    }
  );
};

/* GET Notelist page */
const noteslist = (req, res) => {
    const path = '/api/notes';
    const requestOptions = 
    {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };

    request(
        requestOptions,
        (err, {statusCode}, body) => { 
          let data;
          
          if (statusCode === 200 ) {
            data=body;
          }        
          renderPage_Noteslist(req, res, body);
        }
    );
};
const renderPage_Noteslist = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    //message = 'API lookup error';
    //responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No places found nearby';
    }
  }
  res.render('note-list',
    {
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: {
        title: 'Loc8r',
        strapLine: 'Find places to work with wifi near you!'
      },
      sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
      locations: responseBody,
      message
    }
  );
};

module.exports = {
    home,
    noteslist,
    about,
    noteinfo,
    notenew,
    addnote,
    doAddReview
};