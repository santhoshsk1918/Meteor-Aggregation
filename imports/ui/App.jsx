import React from 'react';
import { AggregateList } from './AggregateList';
import { AtlasSearchList } from './AtlasSearchList';
export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <AggregateList />
    <br />
    <AtlasSearchList />
  </div>
);
