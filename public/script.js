const $category = $('#category');
const $keyword = $('#keyword');
const $from = $('#from');
const $to = $('#to');
const $alert = $('#alert');

// hides "to" and "from" fields by default
$from.hide();
$to.hide();
$alert.hide();

// handle changes in category
$category.on('change', e => {
    if (e.target.value === 'year') {
        $from.show();
        $to.show();
        $keyword.hide();
    } else {
        $from.hide();
        $to.hide();
        $keyword.show();
        $alert.hide();
    }
});

// listens for changes in numeric field
// alerts when input is not numeric
let fromReady = true;
let toReady = true;
$from.on('input', e => {
    if(isNaN(e.target.value)) {
        fromReady = false;
        $alert.slideDown();
    } else {
        fromReady = true;
        if (toReady) $alert.slideUp();
    }
});
$to.on('input', e => {
    if(isNaN(e.target.value)) {
        toReady = false;
        $alert.slideDown();
    } else {
        toReady = true;
        if (toReady) $alert.slideUp();
    }
});

// validate on form submission
$('form').on('submit', e => {
    const notReady = !(fromReady && toReady);
    if(notReady) {
        e.preventDefault();
    };
});






