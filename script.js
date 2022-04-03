
	// Elements
let title 	= document.getElementById('title'),
	price 	= document.getElementById('price'),
	taxes 	= document.getElementById('taxes'),
	ads 	= document.getElementById('ads'),
	discount= document.getElementById('discount'),
	total 	= document.getElementById('total'),
	count 	= document.getElementById('count'),
	category= document.getElementById('category'),
	create 	= document.getElementById('create'),
	delAll 	= document.getElementById('deleteAll');


	// Get Product Total Price 
function getTotalPrice() {
	if (price.value) {
		total.innerHTML = (+price.value + +taxes.value + +ads.value - +discount.value);
		total.style.background = 'green';
	}
	else {
		total.innerHTML = '';
		total.style.background = '#800';
	}
}

	// Create Product and Store Data in LocalStorage
if(localStorage.product){
	data = JSON.parse(localStorage.product) // Convert into javascript array
}
else {
	data = new Array()
}

create.onclick = function(){
	console.log('create initiated')
	let newObjData = {
		title: title.value,
		price: price.value,
		taxes: taxes.value,
		ads: ads.value,
		discount: discount.value,
		total: total.innerHTML,
		count: count.value,
		category: category.value,
	}

	if(count.value != 1 && count.value != ''){ // Check if count exists and create multi elements at once 
		for( var i = 1; i <= +count.value; i++ )
		{
			data.push(newObjData)
		}
	}
	else { 
		data.push(newObjData)
	}

	localStorage.setItem('product', JSON.stringify(data)); // Convert into json
	showData()
}

	// Clear Data
clear.onclick = function() {
	title.value = ''
	price.value = ''
	taxes.value = ''
	ads.value = ''
	discount.value = ''
	count.value = ''
	category.value = ''

	total.innerHTML = ''
	total.style.background = '#b00'
}

	// Add Data to the Table
function showData(){
	let table = document.getElementById('table-body'),
		tbody = ''
	
	for (var i = 0;i < data.length; i++) 
	{
		tbody += `
			<tr id='row-${i}'>
				<td class="row-data">${i}</td>
				<td class="row-data">${data[i].title}</td>
				<td class="row-data">${data[i].price}</td>
				<td class="row-data">${data[i].taxes}</td>
				<td class="row-data">${data[i].ads}</td>
				<td class="row-data">${data[i].discount}</td>
				<td class="row-data">${data[i].total}</td>
				<td class="row-data">${data[i].category}</td>
				<td class="row-data"><button id='upd' onclick='updateData(${i})'>UPDATE</button></td>
				<td class="row-data"><button id='del' onclick='deleteData(${i})'>DELETE</button></td>
			</tr>
				`
	}

	table.innerHTML = tbody;
	if (delAll.innerHTML == '' && table.innerHTML) {
		delAll.innerHTML = '<button id="delAll" onclick="deleteAllData()">Delete All</button>'
	}
}

	// Delete Item from Table
function deleteData(i){
	data.splice(i,1) // Delete Item number (i) from array
	localStorage.product = JSON.stringify(data)
	showData()
}

	// Delete All Items from table
function deleteAllData(){
	data.splice(0,data.length)
	localStorage.product = JSON.stringify(data)
	showData()
	delAll.innerHTML = ''
	console.log('All Data Deleted Succesfuly !')
}

	// Update Item
function updateData(i) {
	title.value = data[i].title
	price.value = data[i].price
	taxes.value = data[i].taxes
	ads.value = data[i].ads
	discount.value = data[i].discount
	category.value = data[i].category
	count.style.display = 'none'

	scroll({
		top: '0',
		behavior: 'smooth',
	})

	create.id = 'update'
	create.innerText = 'Update Item'
	var updateItem = document.getElementById('update')

		updateItem.onclick = function(){
			data[i].title 	 = title.value
			data[i].price 	 = price.value
			data[i].taxes 	 = taxes.value
			data[i].ads 	 = ads.value
			data[i].discount = discount.value
			data[i].total 	 = total.innerHTML
			data[i].category = category.value

			localStorage.product = JSON.stringify(data)
			showData()
		}
}


showData() // Show Data After Reloading the Page 