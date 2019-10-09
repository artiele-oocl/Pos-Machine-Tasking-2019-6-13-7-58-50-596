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

    return printReceipt(filteredItems(collectionBarcode,db));
};

function filteredItems(collectionBarcode,db) {
    const filtered = [];
    collectionBarcode.forEach(code => {
        db.forEach(info=> {
            if (code === info.id) {
                if (!isInObject(filtered,code)) {
                    filtered.push({'id':code,'name':info.name, 'price':info.price, 'qty':1})
                } else {
                    filtered.forEach(filteredItem => {
                        if (code === filteredItem.id) {
                            parseInt(filteredItem.qty = filteredItem.qty + 1);
                        }
                    })
                } 
            }
        })
    })
    return filtered;
}
function isInObject(object,val){
    return object.some(ov => ov.id === val)
}
function printReceipt(filteredItems) {
    out="Receipts\n"+
    "------------------------------------------------------------\n"+
    constructReceiptDetails(obj)
    "------------------------------------------------------------\n"+
    `Price: ${getTotal}`
    return out;
}
