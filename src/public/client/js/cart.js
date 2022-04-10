// Cart
var product = document.querySelector('.product-container')
var addBtn = product.querySelector('.add-cart-btn')
let items = [];

addBtn.addEventListener('click', function () {
	
	if(typeof(Storage) !== 'undefined') {
		let item = {
			sku: product.querySelector('.product-sku').value,
			img: product.querySelector('.product-img').src,
			name: product.querySelector('.product-name').innerText,
			price: product.querySelector('.product-price').innerText.replaceAll(',', ''),
			color: product.querySelector('.product-color').value,
			size: product.querySelector('.product-size').value,
			qty: parseInt(product.querySelector('.product-qty').value)
		};
		
		if(JSON.parse(localStorage.getItem('items')) === null) {
			items.push(item);
			localStorage.setItem("items", JSON.stringify(items));
			window.location.reload();
		}
		else {
			const localItems = JSON.parse(localStorage.getItem('items'))
			localItems.map(data => {
				if(item.sku == data.sku && item.size == data.size) {
					item.qty = item.qty + data.qty;
				}
				else {
					items.push(data);
				}
			});
			items.push(item)
			localStorage.setItem("items", JSON.stringify(items));
			window.location.reload();
			}
		}
	else {
		alert('local storage is not working')
	}
});

