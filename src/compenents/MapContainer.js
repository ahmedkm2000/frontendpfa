import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React,{Component} from "react";
import AlternativeService from "../services/AlternativeService";
const mapStyles = {
    width: '50%',
    height: '50%'
};
export class MapContainer extends Component {
    state = {
        lat: 33.58831,
        lng:-7.61138,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        stores: []
    };
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.longitude)
            console.log(position.coords.latitude)
            this.setState(prevState => {
                    return{...prevState,
                        lat:position.coords.latitude,
                        lng:position.coords.longitude
                    }
                }
            )
        });
        AlternativeService.getAllAlternatives().then((res)=>{
            this.setState(prevState => {
                    return{...prevState,
                        stores:res.data
                    }
                }
            )
            console.log(this.state)
    })}

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }}

    displayMarkers = () => {
    return this.state.stores.map((store, index) => {
        return (
        <Marker key={index} id={index} position={{
            lat: store.latitude,
            lng: store.longitude
        }} onClick={() => console.log("You clicked me!")} />)
    })
}
    render() {
        return (
            <div>
                <div>
                <h1>Read about the project</h1>
                 <p>Les méthodes mathématiques d'analyse multicritère ont pour but la résolution des problèmes d'Aide à la décision multicritère1. Elles constituent une étape importante du processus de décision, qui suit celle d'identification et de définition du problème, et aboutissent au choix d'une ou plusieurs solutions optimale(s), au sens de Pareto, parmi un ensemble discret de solutions, via une procédure de sélection. Elles permettent également de répondre aux problématiques de tri et de rangement, par l'intermédiaire d'une procédure d'affectation et de classement respectivement.</p>
                <h1>location of alternatives </h1>
            <Map google={this.props.google}
                 zoom={5}
                 style={mapStyles}
                 initialCenter={{
                    lat:this.state.lat,
                    lng:this.state.lng}}
              >
                {this.displayMarkers()}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
            </div>
                <div >
                    <button>Next</button>
                </div>

            </div>
        );
    }
}
MapContainer = GoogleApiWrapper({
    apiKey: ('AIzaSyCRQ1IY4o-08ITUikW79nVv3xfSUZeUObg'),
    language: "FR"
})(MapContainer)