import React, {Component} from 'react';

export class Thumbnails extends Component {
	render() {
		const {images, tab, referencia} = this.props;
		return(
			<div className="thumb" ref={referencia}>
				{
					images.map((img, index) =>(
						<img src={img} alt="" key={index}
						onClick ={() => tab(index)}
						/>
					))
				}
			</div>
		)
	}
}

export default Thumbnails