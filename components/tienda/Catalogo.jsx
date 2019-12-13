import React from 'react'
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';


class Catalogo extends React.Component {
  componentWillMount(){
    this.checkCarrito(this.props.id);
  }
  constructor(props) {
    super(props);
    this.state = { 
      inputValue : 1,
      disponible : this.props.disponible,
      contadorCarrito : 0,
      listaProductos: [],
      listaCarrito: JSON.parse(sessionStorage.getItem('Carrito')) ? JSON.parse(sessionStorage.getItem('Carrito')) : [] ,
      productoCarrito : {
          id : '',
          descripcion : '',
          imagen : '',
          cantidad : '',
        },
    };
  }
  render() {
    return (
        <div className="col s12 m4 l3 animated fadeIn fast">
          <div className="card">
            <div className={this.state.disponible ? 'card-image' : 'card-image grayscale'}>
              <img src={this.props.imagen} />
             </div>
            <div className="card-content">
              <div className="informacion blue-grey-text text-darken-2">
                <span className="card-title  text-shadow">{this.props.descripcion}</span>
                <span hidden={this.state.contadorCarrito ? false : true}className="badge carrito"><Link to="/carrito"><small className="white-text text-shadow"><i className="material-icons left">shopping_cart</i> <p className="left  ">{this.state.contadorCarrito}</p></small></Link></span>
                <p><b>Precio: </b><FormattedMessage   id="precio"  defaultMessage={`$ {precio, number}`} values={{precio : this.props.precio}}  /></p>
                <p><b>Disponibles: </b>{this.state.disponible ? this.state.disponible : 'Agotado'}</p>
                <div className="input-group" >
                  <div className="file-field input-field">
                      <button  onClick={this.agregarProducto.bind(this)}  type="button" disabled={ (this.props.disponible <= 0) ? true : false } >Añadir</button>
                    <div className="file-path-wrapper">
                      <input type="number" value={this.state.inputValue} disabled={ (this.props.disponible <= 0 ) ? true : false } min="0" max={this.props.disponible} className="form-control right-align" onChange={evt => this.updateInputValue(evt)}></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-action"><Link to={`/producto/${this.props.id}`}>Ver detalle</Link></div>
          </div>
        </div>
    )
  }

  agregarProducto(){
     let cantidad = this.state.inputValue
     if (cantidad <=0) {
      alert('Seleccione una cantidad válida');
      return
     }
     if(this.state.disponible < cantidad){
       alert('Máxima existencia es: '+ this.state.disponible);
     }else{
       let disponibles = (Number(this.state.disponible) - Number(cantidad));
       let agregarACarrito = (Number(this.state.contadorCarrito) + Number(cantidad));
       this.setState({disponible : disponibles});
       this.setState({contadorCarrito : agregarACarrito});
       this.state.productoCarrito.id =  this.props.id;
       this.state.productoCarrito.descripcion =  this.props.descripcion;
       this.state.productoCarrito.imagen =  this.props.imagen;
       this.state.productoCarrito.precio =  this.props.precio;
       this.state.productoCarrito.cantidad = (Number(this.state.productoCarrito.cantidad) +  Number(cantidad));
       this.props.actualizarDisponible(this.state.productoCarrito, cantidad, false);
     }
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  checkCarrito(id){
    let productoCarrito = this.props
    for(let itemCarrito of this.state.listaCarrito){ 
      if(itemCarrito.id == productoCarrito.id){
        let actualizarDisponible = (Number(this.state.disponible) - Number(itemCarrito.cantidad));
        this.setState({disponible : actualizarDisponible, contadorCarrito : itemCarrito.cantidad});
      }
      //(itemCarrito.id, itemCarrito.cantidad); //Actualizar las cantidades de los productos a agregar en el carrito
    }
  }
//------------------------------------------------------------------------------

}export default Catalogo
