import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as dropboxActions from '../../actions/dropbox';
import * as baseActions from '../../actions/base';

import './Settings.css';

import TabButtons from '../UI/TabButtons';

import _ from 'lodash';

class Settings extends PureComponent {
  constructor(props) {
    super(props);

    _.bindAll(this, ['handleSignOutClick', 'handleFontSizeChange']);
  }

  handleSignOutClick() {
    this.props.dropbox.signOut();
  }

  handleFontSizeChange(newFontSize) {
    this.props.base.setFontSize(newFontSize);
  }

  render() {
    const { fontSize } = this.props;

    return (
      <div>
        <div className="setting-container">
          <div className="setting-label">Font size</div>
          <TabButtons buttons={['Regular', 'Large']}
                      selectedButton={fontSize}
                      onSelect={this.handleFontSizeChange} />
        </div>

        <div className="settings-buttons-container">
          <button className="btn settings-btn" onClick={this.handleSignOutClick}>Sign out</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    fontSize: state.base.get('fontSize') || 'Regular',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dropbox: bindActionCreators(dropboxActions, dispatch),
    base: bindActionCreators(baseActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);