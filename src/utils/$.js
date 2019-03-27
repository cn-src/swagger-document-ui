/**
 * 精简 lodash，以及自定义工具方法。
 */

import flatMap from 'lodash/flatMap'
import map from 'lodash/map'
import groupBy from 'lodash/groupBy'
import join from 'lodash/join'
import forOwn from 'lodash/forOwn'
import isString from 'lodash/isString'
import get from 'lodash/get'
import endsWith from 'lodash/endsWith'
import isArray from 'lodash/isArray'
import random from 'lodash/random'
import slice from 'lodash/slice'
import sortBy from 'lodash/sortBy'
import split from 'lodash/split'
import remove from 'lodash/remove'

export default {
    flatMap, map, groupBy, forOwn, join,
    get, isString, endsWith, isArray, random, slice, sortBy, split,remove
}
