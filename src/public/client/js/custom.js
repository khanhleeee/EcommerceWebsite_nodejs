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
}

openSiteCart.addEventListener('click', showSiteCart);
closeSiteCart.addEventListener('click', hideSiteCart);
siteCart.addEventListener('click', hideSiteCart);
siteCartContainer.addEventListener('click', function (event) {
	event.stopPropagation();
})


