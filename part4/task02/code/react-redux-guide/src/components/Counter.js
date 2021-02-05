import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as counterAction from "../store/actions/counter.actions.js";

function Counter ({count, inc, dec}) {
  return <div>
    <button onClick={() => inc(5)}>+</button>
    <span>{count}</span>
    <button onClick={() => dec(5)}>-</button>
  </div>
}

const mapStateToProps = state => ({
  count: state.count
})

const mapDispatchToProps = dispatch => bindActionCreators(counterAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter);