// @flow

// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { middlewareHooks as searchHooks } from '../components/SearchTracePage/SearchForm.track';
import { middlewareHooks as timelineHooks } from '../components/TracePage/TraceTimelineViewer/duck.track';
import { isGaEnabled } from '../utils/tracking';

const middlewareHooks = { ...timelineHooks, ...searchHooks };

function trackingMiddleware(store: { getState: () => any }) {
  return function inner(next: any => void) {
    return function core(action: any) {
      const { type } = action;
      if (typeof middlewareHooks[type] === 'function') {
        middlewareHooks[type](store, action);
      }
      return next(action);
    };
  };
}

export default (isGaEnabled ? trackingMiddleware : undefined);
