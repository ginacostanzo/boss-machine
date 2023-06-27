const checkMillionDollarIdea = (req, res, next) => {
    const idea = req.body;
    if (!idea || !idea.numWeeks || !idea.weeklyRevenue) {
        res.status(400).send('Missing information.')
    } else {
        const value = idea.numWeeks * idea.weeklyRevenue;
        if (value < 1000000 || !value) {
            res.status(400).send('Idea is not valuable enough.')
        } else {
            next();
        }
}
}

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
