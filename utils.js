// Utility functions

function isANumber(val) {
    return ((typeof val === 'number') && !isNaN(val));
}

module.exports = { isANumber }