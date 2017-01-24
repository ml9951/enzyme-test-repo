import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';

import * as Actions from './actions/Actions'
import Store from './stores/Store'

class TestComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <button onClick={() => Actions.save({})}>save</button>
      </div>
    );
  }
}

describe('Issue #785', () => {
  it('Saves an object to a store', done => {
    const wrapper = mount(<TestComponent/>)
    Store.on('object-saved', () => {
      done()
    })
    wrapper.find('button').simulate('click')
  })

  it('should call lifecycle methods on mount/unmount', () => {
    const willMount = sinon.spy();
    const didMount = sinon.spy();
    const willUnmount = sinon.spy();

    class Foo extends React.Component {
      constructor(props) {
        super(props);
        this.componentWillUnmount = willUnmount;
        this.componentWillMount = willMount;
        this.componentDidMount = didMount;
      }
      render() {
        return (
          <div className={this.props.id}>
            {this.props.id}
          </div>
        );
      }
    }

    const wrapper = mount(<Foo id="foo" />);
    expect(willMount.callCount).toEqual(1);
    expect(didMount.callCount).toEqual(1);
    expect(willUnmount.callCount).toEqual(0);
    wrapper.unmount();
    expect(willMount.callCount).toEqual(1);
    expect(didMount.callCount).toEqual(1);
    expect(willUnmount.callCount).toEqual(1);
  });
})