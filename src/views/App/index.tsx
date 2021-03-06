import React, { useLayoutEffect } from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation
} from 'react-router-dom';
import { LoginCallback, SecureRoute } from '@okta/okta-react';
import { useFlags } from 'launchdarkly-react-client-sdk';

import Footer from 'components/Footer';
import Header from 'components/Header';
import PageWrapper from 'components/PageWrapper';
import { MessageProvider } from 'hooks/useMessage';
import AccessibilityStatement from 'views/AccessibilityStatement';
import AuthenticationWrapper from 'views/AuthenticationWrapper';
import Cookies from 'views/Cookies';
import FlagsWrapper from 'views/FlagsWrapper';
import Home from 'views/Home';
import Login from 'views/Login';
import ModelPlan from 'views/ModelPlan';
import Collaborators from 'views/ModelPlan/Collaborators';
import Documents from 'views/ModelPlan/Documents';
import NewPlan from 'views/ModelPlan/NewPlan';
import Status from 'views/ModelPlan/Status';
import StepsOverview from 'views/ModelPlan/StepsOverview';
import TaskList from 'views/ModelPlan/TaskList';
import Basics from 'views/ModelPlan/TaskList/Basics';
import Beneficiaries from 'views/ModelPlan/TaskList/Beneficiaries';
import CostEstimate from 'views/ModelPlan/TaskList/CostEstimate';
import Characteristics from 'views/ModelPlan/TaskList/GeneralCharacteristics';
import OpsEvalAndLearning from 'views/ModelPlan/TaskList/OpsEvalAndLearning';
import Participants from 'views/ModelPlan/TaskList/ParticipantsAndProviders';
import Payment from 'views/ModelPlan/TaskList/Payment';
import Population from 'views/ModelPlan/TaskList/Population';
import SubmitRequest from 'views/ModelPlan/TaskList/SubmitRequest';
import NotFound from 'views/NotFound';
import PrivacyPolicy from 'views/PrivacyPolicy';
import Sandbox from 'views/Sandbox';
import TermsAndConditions from 'views/TermsAndConditions';
import TimeOutWrapper from 'views/TimeOutWrapper';
import UserInfo from 'views/User';
import UserInfoWrapper from 'views/UserInfoWrapper';

import { NavContextProvider } from '../../components/Header/navContext';

import shouldScroll from './scrollConfig';

import './index.scss';

const AppRoutes = () => {
  const location = useLocation();
  const flags = useFlags();

  // Scroll to top
  useLayoutEffect(() => {
    if (shouldScroll(location.pathname)) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <Switch>
      {/* General Routes */}
      <Redirect exact from="/" to="/models" />
      <Route path="/models" exact component={Home} />

      <Redirect exact from="/login" to="/signin" />
      <Route path="/signin" exact component={Login} />
      <SecureRoute path="/user-diagnostics" component={UserInfo} />

      {/* Model Routes */}
      <SecureRoute path="/models" exact component={ModelPlan} />

      <SecureRoute
        path="/models/steps-overview"
        exact
        component={StepsOverview}
      />
      <SecureRoute path="/models/new-plan" component={NewPlan} />
      <SecureRoute
        path="/models/:modelID/collaborators"
        exact
        component={Collaborators}
      />
      <SecureRoute path="/models/:modelID/documents" component={Documents} />
      <SecureRoute path="/models/:modelID/status" exact component={Status} />
      <SecureRoute
        path="/models/:modelID/task-list"
        exact
        component={TaskList}
      />
      <SecureRoute
        path="/models/:modelID/task-list/basics"
        component={Basics}
      />
      <SecureRoute
        path="/models/:modelID/task-list/beneficiaries"
        component={Beneficiaries}
      />
      <SecureRoute
        path="/models/:modelID/task-list/characteristics"
        component={Characteristics}
      />
      <SecureRoute
        path="/models/:modelID/task-list/cost-estimate"
        component={CostEstimate}
      />
      <SecureRoute
        path="/models/:modelID/task-list/ops-eval-and-learning"
        component={OpsEvalAndLearning}
      />
      <SecureRoute
        path="/models/:modelID/task-list/participants-and-providers"
        component={Participants}
      />
      <SecureRoute
        path="/models/:modelID/task-list/payment"
        component={Payment}
      />
      <SecureRoute
        path="/models/:modelID/task-list/population"
        component={Population}
      />
      <SecureRoute
        path="/models/:modelID/task-list/submit-request"
        component={SubmitRequest}
      />

      {/* Static Page Routes  */}
      <Route path="/privacy-policy" exact component={PrivacyPolicy} />
      <Route path="/cookies" exact component={Cookies} />
      <Route
        path="/accessibility-statement"
        exact
        component={AccessibilityStatement}
      />
      <Route
        exact
        path="/terms-and-conditions"
        component={TermsAndConditions}
      />

      {/* Misc Routes */}
      {flags.sandbox && <Route path="/sandbox" exact component={Sandbox} />}

      <Route path="/implicit/callback" component={LoginCallback} />

      {/* 404 */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

const App = () => {
  const handleSkipNav = () => {
    const mainContent = document.getElementById('main-content')!;
    if (mainContent) {
      mainContent.focus();
    }
  };

  return (
    <>
      <div className="usa-overlay" />
      <button type="button" className="skipnav" onClick={handleSkipNav}>
        Skip to main content
      </button>
      <BrowserRouter>
        <AuthenticationWrapper>
          <MessageProvider>
            <FlagsWrapper>
              <UserInfoWrapper>
                <TimeOutWrapper>
                  <NavContextProvider>
                    <PageWrapper>
                      <Header />
                      <AppRoutes />
                      <Footer />
                    </PageWrapper>
                  </NavContextProvider>
                </TimeOutWrapper>
              </UserInfoWrapper>
            </FlagsWrapper>
          </MessageProvider>
        </AuthenticationWrapper>
      </BrowserRouter>
    </>
  );
};

export default App;
