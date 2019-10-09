module.exports = (collectionBarcode, db) => {
    if (validateCollectionBarcode(collectionBarcode, db).length > 0)
    {
        return validateCollectionBarcode(collectionBarcode, db);
    }
    return printReceipt(collectionBarcode, db);
};

function validateCollectionBarcode(collectionBarcode, db) {
    const invalidCodes = [];
    const validCodes = validBarcodesList(db);
    if (collectionBarcode.length < 1)
    {
        return "[ERROR]: Barcodes are required";
    }
    collectionBarcode.forEach(code => {
        if (!validCodes.includes(code)) invalidCodes.push(code);
    })
    return "[ERROR]: Barcodes are not valid: " + invalidCodes;
}
function validBarcodesList(db) {
    let validBarcodesList = [];
    db.forEach(item => validBarcodesList.push(item.id));
    return validBarcodesList;
}
function printReceipt(collectionBarcode, db) {
    const out =
        "Receipts\n" +
        "------------------------------------------------------------\n" +
        formatReceiptDetails(filteredItems(collectionBarcode, db)) +
        "------------------------------------------------------------\n" +
        `Price: ${getTotal(filteredItems(collectionBarcode, db))}`
    return out;
}
function formatReceiptDetails(filteredItems) {
    let formatReceiptDetails = '';
    filteredItems.forEach(item => {
        const spacesLeft = new Array(33 - item.name.length).join(' ');
        const spacesRight = new Array(12 - item.price.toString().length).join(' ');
        formatReceiptDetails += (item.name + spacesLeft + item.price.toString() + spacesRight + item.qty.toString() + '\n');
    })
    return formatReceiptDetails;
}
function filteredItems(collectionBarcode, db) {
    const filtered = [];
    collectionBarcode.forEach(code => {
        db.forEach(info => {
            if (code === info.id) !isInObject(filtered, code) ? addFirstInstance(filtered, info) : updateQuantity(filtered, code);
        })
    })
    return filtered;
}
function isInObject(object, val) {
    return object.some(ov => ov.id === val);
}
function updateQuantity(filtered, code) {
    filtered.forEach(filteredItem => {
        if (code === filteredItem.id) filteredItem.qty++;
    })
}
function addFirstInstance(filtered, info) {
    filtered.push({ 'id': info.id, 'name': info.name, 'price': info.price, 'qty': 1 });
}
function getTotal(filteredItems) {
    return filteredItems.reduce(getSumFromSubTotal, 0);
}
function getSumFromSubTotal(sum, itemObj) {
    return sum + (itemObj.qty * itemObj.price);
}
