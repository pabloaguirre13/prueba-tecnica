const express = require('express')
const axios = require('axios')
const app = express()
const port = 5000

app.get('/producto/:sku', (req, res) => {
	axios.get(`https://simple.ripley.cl/api/v2/products?format=json&partNumbers=${req.params.sku}`)
	.then(function (body) {
		var datos = body.data[0]
		var nombre = datos.name
		var imagenes = datos.images
		var descripcion = datos.shortDescription
		var descripcionLarga

		if (datos.longDescription != null) {
			descripcionLarga = datos.longDescription
		}
		else {
			//Si no hay descripcion larga, se envia un html vacio
			descripcionLarga = "&nbsp"
		}

		var precioOferta = datos.prices.formattedOfferPrice

		res.send({nombre, imagenes, descripcion, descripcionLarga, precioOferta})
	})
	.catch(function (error) {
		console.log(error)
	})
})

app.listen(port, () => {
	console.log(`Escuchando en http://localhost:${port}`)
})