/* GET Homepage */

const travel = (req, res) => {
    res.render('travel', {title: 'Travlr Getaway'});
};

module.exports = {
    travel
};