import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Store from './reducers';

class View extends React.Component {
  componentWillMount() {
    Store.init({});
  }
  render() {
    return (
      <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>

      </div>
    );
  }
}

View.propTypes = {
  userName: PropTypes.string.isRequired,
};

const stateToProps = state => _.assign({ userName: state.nav.userName }, state['<%= path %>']);

export default connect(stateToProps)(View);
