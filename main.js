module.exports = (num1, num2) => {
    const collectionBarcode = ['0001', '0003', '0005', '0003'];
    const db =
    [
        {"id": "0001", "name" : "Coca Cola", "price": 3},
        {"id": "0002", "name" : "Diet Coke", "price": 4},
        {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
        {"id": "0004", "name" : "Mountain Dew", "price": 6},
        {"id": "0005", "name" : "Dr Pepper", "price": 7},
        {"id": "0006", "name" : "Sprite", "price": 8},
        {"id": "0007", "name" : "Diet Pepsi", "price": 9},
        {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
        {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
        {"id": "0010", "name" : "Fanta", "price": 12}
    ]

    return printReceipt(getUniqueBarcodes(collectionBarcode),db);
};

function printReceipt(collectionBarcode,db) {
    let arr = [];
    collectionBarcode.forEach(e => {
        if (arr.length === 0 || isInObject(arr,e.id) === false) {
            arr.push({'Name':e.Name, 'Quantity': 1, 'Unit price': parseFloat(e.Price).toFixed(2), 'Subtotal': parseFloat(e.Price).toFixed(2)})
        } else {
            arr.forEach(ov => {
                if (ov.Name===e.Name) {
                    parseInt(ov.Quantity = ov.Quantity + 1);
                    parseFloat(ov.Subtotal = parseFloat(ov['Quantity'] * ov['Unit price']).toFixed(2));
                }
            })
        }
    });
    return arr;
}
function isInObject(object,val){
    return object.some(ov => ov.id === val)
}
function getUniqueBarcodes(collectionBarcode) {
    uniqueArray = collectionBarcode.filter(function(item, pos) {
        return collectionBarcode.indexOf(item) == pos;
    })
    return uniqueArray;
}
