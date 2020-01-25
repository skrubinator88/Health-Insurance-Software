module.exports = {
    validateQuery(query) {
        if (!(query.pageNo || query.pageLimit)) return { error: 'pageNo or pageLimit not specified'};
        let pageLimit = parseInt(query.pageLimit);
        let pageNumber = (parseInt(query.pageNo) - 1) * pageLimit;
        if (Number.isNaN(pageNumber) || Number.isNaN(pageLimit)) return { error: 'pageNo and pageLimit must both be numbers'};
        return {
            pageNo: pageNumber,
            pageLimit: pageLimit
        }
    }
};