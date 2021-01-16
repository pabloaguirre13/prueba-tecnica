import React, {Component} from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import './App.css';
import Thumbnails from './components/Thumbnails';

class App extends Component{
	constructor () {
		super();
		this.state = {
			name: "",
			images: [""],
			description: "",
			content: "",
			price: "",
			index: "",
		}
	}

	componentDidMount = () => {
		axios.get("/producto/2000379450763").then(response => {
			this.setState({
				name: response.data.nombre,
				images: response.data.imagenes,
				description: response.data.descripcion,
				content: response.data.descripcionLarga,
				price: response.data.precioOferta,
				index: 0
			});

			//Marca como activa la imagen correspondiente en los thumbnails
			this.referencia.current.children[this.state.index].className= "active";
		});
	};

	referencia = React.createRef();

	//Cambiar la imagen principal cuando se clickea algun thumbnail
	handleTab = index => {
		this.setState({index: index});
		const images = this.referencia.current.children;

		for (let i=0; i<images.length; i++) {
			images[i].className = images[i].className.replace("active", "");
		}

		images[index].className = "active";
	};

	render(){
		const producto = this.state;
		
		return(
			<div className="app">
				<div className="details">
					<div className="big-img">
						<img src={producto.images[producto.index]} alt=""/>	
					</div>	

					<div className="box">
						<div className="row">
							<h2>{producto.name}</h2>
							<span>{producto.price}</span>
						</div>

						<p>{producto.description}</p>
						<p>{parse(producto.content)}</p>
						
						<Thumbnails images={producto.images} tab={this.handleTab} referencia={this.referencia} />

						<button className="cart">Agregar a la bolsa</button>
					</div>
				</div>
			</div>
		);
	};
}

export default App;
