"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.initialState = void 0;
var initialState = null;
exports.initialState = initialState;

var reducer = function reducer(state, action) {
  if (action.type === "USER") {
    return action.payload;
  }

  return state;
};

exports.reducer = reducer;