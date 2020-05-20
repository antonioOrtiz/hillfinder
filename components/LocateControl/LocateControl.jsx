import { useEffect } from 'react';
import { withLeaflet } from 'react-leaflet';
import Locate from 'leaflet.locatecontrol';
import Modal from '../Modal/MyModal.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalStateOn, modalStateOff } from '../../store/reducers/ui';

function LocateControl({ options, startDirectly, leaflet, modalActive, modalStateOn }) {
  useEffect(() => {
    var { map } = leaflet;
    const lc = new Locate(options);
    lc.addTo(map);

    if (startDirectly) {
      // request location update and set location
      // modalStateOn();
      var message = `Will you allow ${window.location.hostname} to access your location?`;
      console.log('modalActive ', modalActive);

      lc.start();
    }
  }, []);

  return null;
}

function mapStateToProps(state) {
  const { ui } = state;
  const { modalActive } = ui;

  return { modalActive };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ modalStateOn, modalStateOff }, dispatch);

export default withLeaflet(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LocateControl)
);
