import algoliasearch from 'algoliasearch/lite';
import React, { Component, Fragment } from 'react';
import {
  ClearRefinements,
  Configure,
  InstantSearch,
  RefinementList,
} from 'react-instantsearch-dom';
import {
  GeoSearch,
  GoogleMapsLoader,
  Marker,
  Control,
} from 'react-instantsearch-dom-maps';
import Places from './places/widget';
import './App.css';

const searchClient = algoliasearch(
  'SXDY3EO0TR',
  'a846bb11aaa2a2ae725a722206ec44a6'
);

class App extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <h1>House of Crimes</h1>
        <InstantSearch
          indexName="hackathon_crime_data"
          searchClient={searchClient}
        >
          <Configure hitsPerPage={2000} />
          <Places
            defaultRefinement={{
              lat: 51.5072,
              lng: 0.1276,
            }}
          />
          <div className="search-panel">
            <div className="search-panel__filters">
              <ClearRefinements />
              <h3>Police Force</h3>
              <RefinementList attribute="police_force" />
              <h3>Crime Type</h3>
              <RefinementList attribute="crime_type" />
              <h3>Location</h3>
              <RefinementList attribute="location" />
            </div>
            <div className="search-panel__results">
              <GoogleMapsLoader apiKey="AIzaSyBPyCfuTleAi6ziQ4p88Wc8DFMadyYJ12s">
                {google => (
                  <GeoSearch
                    google={google}
                    initialPosition={{
                      lat: 51.5072,
                      lng: 0.1276,
                    }}
                    enableRefineOnMapMove={true}
                    enableRefine={true}
                    initialZoom={10}
                  >
                    {({ hits }) => (
                      <Fragment>
                        <Control />
                        {hits.map(hit => (
                          <Marker key={hit.objectID} hit={hit} />
                        ))}
                      </Fragment>
                    )}
                  </GeoSearch>
                )}
              </GoogleMapsLoader>
            </div>
          </div>
        </InstantSearch>
      </div>
    );
  }
}

export default App;
