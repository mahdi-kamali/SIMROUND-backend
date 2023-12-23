const paginateQuery = async (model, pageNumber = 1, itemsPerPage = 10,
    sortQuery
) => {

    try {


        const skip = (pageNumber - 1) * itemsPerPage;
        const query = model.find(sortQuery).sort({"createdAt": -1})
        const totalItems = await model.countDocuments(query);


        const paginateQuery = query
            .skip(skip).limit(itemsPerPage)


        const results = await paginateQuery.exec();

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        return {
            totalItems,
            currentPage: pageNumber,
            totalPages,
            itemsPerPage,
            data: results
        };
    }
    catch (err) {
        throw err
    }
};


module.exports = { paginateQuery }
