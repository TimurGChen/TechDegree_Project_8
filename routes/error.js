const express = require('express');
const router = express.Router();

// handles 404 errors
router.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    res.status = err.status;
    console.log(err.message, err.status);
    res.render('page-not-found');
});

// handles other general server errors
router.use((err, req, res, next) => {
    res.status = err.status;
    console.log(err.message, err.status);
    res.render('error', { err });
});

module.exports = router;