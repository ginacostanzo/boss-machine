const checkMillionDollarIdea = (idea) => {
    const value = idea.numWeeks * idea.weeklyRevenue;
    if (value >= 1000000) {
        return true;
    } else {
        return false;
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
