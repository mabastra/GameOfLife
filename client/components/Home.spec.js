/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { UserPage } from './UserPage'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserPage', () => {
  let userPage

  beforeEach(() => {
    userPage = shallow(<UserPage username="cody" />)
  })

  it('renders the email in an h3', () => {
    expect(userPage.find('h3').text()).to.be.equal('Welcome, cody')
  })
})
