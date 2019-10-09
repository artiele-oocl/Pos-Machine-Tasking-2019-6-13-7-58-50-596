module.exports = (collectionBarcode, db) => {
    return printReceipt(collectionBarcode, db);
};

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
function getTotal(filteredItems) {
    return filteredItems.reduce(getSumFromSubTotal, 0);
}
function getSumFromSubTotal(sum, itemObj) {
    return sum + (itemObj.qty * itemObj.price);
}

const collectionBarcode = ['0001', '0003', '0005', '0003'];
const db =
    [
        { "id": "0001", "name": "Coca Cola", "price": 3 },
        { "id": "0002", "name": "Diet Coke", "price": 4 },
        { "id": "0003", "name": "Pepsi-Cola", "price": 5 },
        { "id": "0004", "name": "Mountain Dew", "price": 6 },
        { "id": "0005", "name": "Dr Pepper", "price": 7 },
        { "id": "0006", "name": "Sprite", "price": 8 },
        { "id": "0007", "name": "Diet Pepsi", "price": 9 },
        { "id": "0008", "name": "Diet Mountain Dew", "price": 10 },
        { "id": "0009", "name": "Diet Dr Pepper", "price": 11 },
        { "id": "0010", "name": "Fanta", "price": 12 }
    ]

console.log(printReceipt(collectionBarcode, db))
