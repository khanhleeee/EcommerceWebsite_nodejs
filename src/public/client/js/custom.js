// Quantity of production
function increaseValue() {
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;
	value++;
	document.getElementById('number').value = value;
}

function decreaseValue() {
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;
	value < 1 ? value = 1 : '';
	value--;
	document.getElementById('number').value = value;
}

const a = ((b, c) => {
	console.log(b + c);
	return b + c;
})

// Modal cart open/close
const openSiteCart = document.querySelector('.site-cart-open');
const siteCart = document.querySelector('.site-cart');

const siteCartContainer = document.querySelector('.site-nav-container-last');
const closeSiteCart = document.querySelector('.cart-close-btn');

// Hàm thêm class open vào modal
function showSiteCart() {
	siteCart.classList.add('open');
}

// Hàm xoá class open vào modal
function hideSiteCart() {
	siteCart.classList.remove('open');
	window.location.reload();
}

openSiteCart.addEventListener('click', showSiteCart);
closeSiteCart.addEventListener('click', hideSiteCart);
siteCart.addEventListener('click', hideSiteCart);
siteCartContainer.addEventListener('click', function (event) {
	event.stopPropagation();
})



//Adding data to shopping cart
const cartAmount = document.querySelector('.cart-amount')
let qty = 0;
if(JSON.parse(localStorage.getItem('items')) === null) {
	qty = 0;
}
else {
	JSON.parse(localStorage.getItem('items')).map(data => {
		qty = qty + data.qty;
	});
}
cartAmount.innerHTML = qty;

// adding cartview data
var cartView = document.getElementsByClassName('cart-view')[0]
let cartData = ``;

if(JSON.parse(localStorage.getItem('items')) === null || JSON.parse(localStorage.getItem('items')) == '' ) {
	cartData += `<tr class="cart-item cart-item-empty"><td>Chưa có sản phẩm trong giỏ hàng</td></tr>`
	document.querySelector('.cart-total-price').innerHTML = '2' + 'đ';
}
else {
	(JSON.parse(localStorage.getItem('items')).map(data => {
		var productTotal = parseFloat(data.qty) * parseFloat(data.price)
		productTotalFormat = Intl.NumberFormat().format(productTotal);
		Total();

		cartData += `
		<tr class="cart-item" id="cart-item">
		<td class="item-img">
		
		<img class="cart-item-image" src="` + data.img +`" alt="Card image cap" id="product-detail">
	</td>
	<td>
		<a href="" class="item-title">` + data.name +`</a>
		<input hidden value="` + data.size + `" class="cart-size" type="text">
		<span class="item-properties">` + data.color + `, ` + data.size +`</span>
		<div class="item-amount">
			<input hidden value="` + data.sku + `" class="cart-sku" type="text">
			<input class="cart-quantity-input" type="number" id="number" value="` + data.qty +`" />

			<span class="cart-price">` + productTotalFormat +`</span>
		</div>
	</td>
	<td>
		<i class="fas fa-times remove-btn" onclick= Delete(this)></i>
	</td>
	</tr>`

	}));

	// Delete item
	function Delete(e) {
		var sku = e.parentElement.parentElement.querySelector('.cart-sku').value
		var size = e.parentElement.parentElement.querySelector('.cart-size').value
		
		let items = [];
		JSON.parse(localStorage.getItem('items')).map(data => {
			if(data.sku != sku || data.size != size) {
				items.push(data);
			}
		});
		localStorage.setItem('items', JSON.stringify(items));
		var cartItem = e.parentElement.parentElement;
		$(cartItem).load(window.location.href + " #cart-item" );
		Total();
	}
}	

	// Total
	function Total() {
		var total = 0;
		(JSON.parse(localStorage.getItem('items')).map(data => {
			var productTotal = parseFloat(data.qty) * parseFloat(data.price)
			total += productTotal;
			document.querySelector('.cart-total-price').innerHTML = Intl.NumberFormat().format(total) + 'đ';
		}))
	}

cartView.innerHTML = cartData;









