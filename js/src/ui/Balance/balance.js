import BigNumber from 'bignumber.js';
import React, { Component, PropTypes } from 'react';

import styles from './balance.css';

export default class Balance extends Component {
  static contextTypes = {
    api: PropTypes.object
  }

  static propTypes = {
    balance: PropTypes.object
  }

  render () {
    const { api } = this.context;
    const { balance } = this.props;

    if (!balance) {
      return null;
    }

    let body = balance.tokens
      .filter((balance) => new BigNumber(balance.value).gt(0))
      .map((balance) => {
        const token = balance.token;
        const value = token.format
          ? new BigNumber(balance.value).div(new BigNumber(token.format)).toFormat(3)
          : api.format.fromWei(balance.value).toFormat(3);

        return (
          <div
            className={ styles.balance }
            key={ token.tag }>
            <img
              src={ token.images.small }
              alt={ token.name } />
            <div>{ value }<small> { token.tag }</small></div>
          </div>
        );
      });

    if (!body.length) {
      body = (
        <div className={ styles.empty }>
          There are no balances associated with this account
        </div>
      );
    }

    return (
      <div className={ styles.balances }>
        { body }
      </div>
    );
  }
}