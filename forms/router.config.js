import SingleDetailsView from './views/single-details-view'

// Trustees
import SingleTrusteeView from './views/trustee/single-trustee-view'
import SingleTrusteeDocumentsView from './views/trustee/single-trustee-documents-view'

import SiteIndex from './views/site-index';

function route(path, component, name = '', description = '', options = {}) {
  return {
    path,
    component,
    name,
    description,
    ...options
  }
}

export const trusteeRoutes = [
  route(
    '/trustee-account-details',
    props => <SingleTrusteeView title="New Business Account" type="Account"/>,
    'Account Details',
    'SMSF details and tax information',
    { isBase: true }
  ),
  route(
    '/trustee-banking',
    props => <p>Banking</p>,
    'Banking',
    'Banking Information'
  ),
  route(
    '/trustee-trustees',
    props => <p>Trustees</p>,
    'Trustees',
    'Who is at the helm'
  ),
  route(
    '/trustee-roles',
    props => <p>Roles</p>,
    'Roles',
    'Designate user roles'
  ),
  route(
    '/trustee-investment-fees',
    props => <p>{'Investment & Fees'}</p>,
    'Investment & Fees',
    'Set up fees and rates'
  ),
  route(
    '/trustee-documents',
    props => <SingleTrusteeDocumentsView title="Documentation" type="Trustee"/>,
    'Documents',
    'Submit documentation'
  ),
  route(
    '/trustee-review-submit',
    props => <p>{'Review & Submit'}</p>,
    'Review & Submit',
    'One last check'
  )
]

export const individualRoutes = [
  route(
    '/individual', 
    props => <SingleDetailsView title="New Individual Account" type="Account"/>,
    'Individual Account',
    'Individual Details',
    { isBase: true }
  ),
]

export const routerConfig = [
  route('/styles', props => <StyleIndex/>),
  ...individualRoutes,
  ...trusteeRoutes,
  route('/', props => <SiteIndex/>),
  route('*', props => <p>404</p>)
]