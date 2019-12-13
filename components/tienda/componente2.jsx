import React from 'react'


class componente2 extends React.Component{
    render(){
        return(
        <div>
            <div>
                <h2>{this.props.mensajeProps}</h2>
                <h3>{this.props.mensaje2}</h3>
                <div>
                  <button onClick={this.props.cambiarEstado}>Cambiar mensaje</button>
                </div>
            </div>
      </div>
            );
        }
      }

componente2.defaultProps = { mensaje3: 'Este es el mensaje en el componente2'};
export default componente2;
