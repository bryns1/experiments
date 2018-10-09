import React from 'react'
import FormElements from '../form-elements'
import {Row, Col} from 'react-grid-system'

import Wrapper from '../wrapper'
import InlineAccordian from '../accordian-inline'
import {Flex} from '../flex'

import valueIs from '../../util/tests/value-is'
import valueIsEmail from '../../util/tests/value-is-email'
import shortThan from '../../util/tests/value-is-shorter-than'

import {
  FaintLabel, 
  FormLabel, 
  BodyCopy, 
  SectionHeading, 
  PageTitle
} from '../styles/font-styles'

import {or} from '../../util/tests/operators'


class SingleDetailsForm extends FormElements{
  constructor(props){
    super(props);
    this.name = 'single_details_form_' + (props.key || '')
  }
  render(){
    const {
      Input, 
      Radio,
      Date,
      Location, 
      Country, 
      Checkbox, 
      Select,
      TaxCountries,
      SelectState
    } = this

    return (
      <>
        <Radio
        name="new_state"
        value="new"
        options={['new:New', 'existing:Existing']}
        />
        {/* Is a new user */}
        <Wrapper 
        hiddenWhen={valueIs('existing')} 
        val={this.val('new_state', 'new')}
        >
          <Input
          label="Title"
          name="title"
          />
          <Row>
            <Col sm={4}>
              <Input
              label="First Name"
              name="first_name"
              />
            </Col>
            <Col sm={4}>
              <Input
              label="Middle"
              name="middle"
              isOptional
              />
            </Col>
            <Col sm={4}>
              <Input
              label="Surname"
              name="surname"
              />
            </Col>
          </Row>
          <FormLabel>Date of Birth</FormLabel>
          <Date/>
          <Country 
          label="Country of birth"
          name="birthplace"
          />

          <SectionHeading>Contact Information</SectionHeading>

          {/* Residental Address */}
          <FormLabel>Resdiential Address</FormLabel>
          <Location name="location_residential"/>

          {/* When you have a seperate postal address */}
          <FormLabel>Mailing Address</FormLabel>
          <Checkbox
          label="Specify different mailing address"
          name="different_mailing"
          />
          <Wrapper
          hiddenWhen={valueIs(false)}
          val={this.val('different_mailing', false)}
          >
            <Location name="location_postal"/>
          </Wrapper>


          <FormLabel>Primary Email Address</FormLabel>
          <InlineAccordian
          label="What will this be used for?"
          render={props => {
            return <p>Email address listed will have the authority to issue account instructions and receive correspondence</p>
          }}
          />
          <FaintLabel>
            Email address listed will have the authority to issue account instructions and receive correspondence
          </FaintLabel>
          <Input name="contact_email" placeholder="Email"/>
          <Wrapper hiddenWhen={or(valueIsEmail, shortThan(5))} val={this.val('contact_email', '')}>Invalid email</Wrapper>
          <Checkbox label="Recieve trade advice emails"/>

          {/* Mobile Phone Number */}
          <FormLabel>Primary Phone Number</FormLabel>
          <Flex>
            <select name="number_text" defaultValue="+61">
              <option value="+61">+61</option>
              <option value="+62">+62</option>
              <option value="+63">+63</option>
              <option value="+64">+64</option>
            </select>
            <input type="tel" placeholder="Phone number"/>
          </Flex>

          {/* Contact Method */}
          <FormLabel>Preferred Contact Method</FormLabel>
          <select>
            <option checked value="email">Email</option>
            <option value="phone">Phone</option>
          </select>

          {/* Investment Purpose */}
          <SectionHeading>Investment Purpose</SectionHeading>
          <BodyCopy>Choose the most relevant response</BodyCopy>
          <Select
          label="Source of Wealth"
          options={[
            'Investment Income', 
            'Business Income', 
            'Sale of assets (eg Property, business, stock)',
            'One-off payment (eg Redundancy, inheritance, court settlement)',
            'Windfall (eg Gift, lottery winnings)',
            'Other (please specify)'
          ]}/>

          <Select
          label="Source of Funds"
          options={[
            'Investment Income', 
            'Business Income', 
            'Sale of assets (eg Property, business, stock)',
            'One-off payment (eg Redundancy, inheritance, court settlement)',
            'Windfall (eg Gift, lottery winnings)',
            'Other (please specify)'
          ]}/>

          {/* Tax Information */}
          <SectionHeading>Tax information</SectionHeading>
          <Wrapper
          hiddenWhen={valueIs('no')}
          val={this.val('tax_resident', 'yes')}
          >
            <FormLabel>Tax file number</FormLabel>
            <InlineAccordian
              label="Why do I need to provide my TFN-number?"
              render={props => <BodyCopy>
                If you are an Australian resident for tax purposes you are not required by law to provide your Tax File Number (TFN).
                
                However if you do not provide a valid TFN or provide TFN exemption details you may have tax deducted from any income you earn on your investments at the highest marginal tax rate plus the Medicare Levy or any other applicable levies or taxes.</BodyCopy>}
            />
            <Input name="tfn"/>
          </Wrapper>

          <Radio
          name='tax_resident'
          value='yes'
          label="Are you an Australian resident for tax purposes?"
          options={['yes:Yes', 'no:No']}
          />

          <Wrapper 
          hiddenWhen={valueIs('yes')}
          val={this.val('tax_resident', 'yes')}
          >
            <p>Are you a US citizen or a resident of another country/jurisdiction (excluding Australia) for tax purposes?</p>
            <Radio
            name='other_tax_resident'
            value='no'
            options={['yes:Yes', 'no:No']}
            />
            <Wrapper
            hiddenWhen={valueIs('no')}
            val={this.val('other_tax_resident', 'no')}
            >
              <TaxCountries/>
            </Wrapper>
          </Wrapper>
          {/* Proof of Identity */}
          <SectionHeading>Proof of Identity</SectionHeading>
          <InlineAccordian 
          label="Requirements"
          render={
            props => <BodyCopy>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet tempor lectus, posuere volutpat sem. Pellentesque sagittis, metus quis hendrerit rhoncus, lectus magna ornare lacus, rhoncus vehicula enim enim convallis nulla.</BodyCopy>
          }/>
          <Select name="verify_method" options={['a:Photo Identity Document', 'b:Non-Photo Identity Document']}/>
          <Wrapper
          renders={
            {
              a: props => (
                // When the `a` option is chosen
                <div>
                  <Select label="Document Type" name="document_type_a" options={[
                    'a:Drivers License', 
                    'b:Australian Passport',
                    'c:Proof of Age Card',
                    'd:Foreign Passport'
                  ]}/>
                  <hr/>
                  <div>
                    <Select label="Verified from" name="certified_copy" options={[
                      'a:Certified Copy'
                    ]}/>
                    <SelectState label="State" name="select_state"/>
                    <Input label="License Number" name="license_num"/>
                    <FormLabel>Expiry Date</FormLabel>
                    <Row>
                      <Col xs={2}><Input placeholder="DD" name="expiry_d"/></Col>
                      <Col xs={2}><Input placeholder="MM" name="expiry_m"/></Col>
                      <Col xs={2}><Input placeholder="YYYY" name="expiry_y"/></Col>
                    </Row>
                    <FormLabel>Identify Verification</FormLabel>
                    <Checkbox name="identity_verify" label="By ticking this box, I declare that I have verified the identify of the client(s) required by AML/CTF Rules, in the capacity of an AFSL holder or their authorised representative."/>
                  </div>
                </div>
              ),
              b: props => (
                // When the `b` option is chosen
                <div>
                  <Select label="Document Type" name="document_type_b" options={[
                    'a:Drivers License', 
                    'b:Australian Passport',
                    'c:Proof of Age Card',
                    'd:Foreign Passport'
                  ]}/>
                  <hr/>
                  <div>
                    <Select label="Verified from" name="certified_copy" options={[
                      'a:Certified Copy'
                    ]}/>
                    <SelectState label="State" name="select_state"/>
                    <Input label="License Number" name="license_num"/>
                    <FormLabel>Expiry Date</FormLabel>
                    <Row>
                      <Col xs={2}><Input placeholder="DD" name="expiry_d"/></Col>
                      <Col xs={2}><Input placeholder="MM" name="expiry_m"/></Col>
                      <Col xs={2}><Input placeholder="YYYY" name="expiry_y"/></Col>
                    </Row>
                    <FormLabel>Identify Verification</FormLabel>
                    <Checkbox name="identity_verify" label="By ticking this box, I declare that I have verified the identify of the client(s) required by AML/CTF Rules, in the capacity of an AFSL holder or their authorised representative."/>
                  </div>
                </div>
              ),
            }
          }
          val={this.val('verify_method', 'a')}
          />
        </Wrapper>

        {/* Is a existing user */}
        <Wrapper 
        hiddenWhen={valueIs('new')} 
        val={this.val('new_state', 'new')}
        >
          is old
        </Wrapper>
      </>
    )
  }
}

export default SingleDetailsForm