import React, { useState, useEffect } from "react";
import { useHttp } from '../hooks/http.hook';
import {
  useAdaptivity,
  SplitLayout,
  SplitCol,
  ViewWidth,
  PanelHeader,
  Epic,
  ScreenSpinner,
  ModalRoot,
  Snackbar,
  Avatar,
  VKCOM
} from "@vkontakte/vkui";

import {
  Icon16ErrorCircleFill,
  Icon16Hand
} from '@vkontakte/icons';

import Instruction from './test/Instruction';
import Tests from "./Tests";
import Profile from './Profile';
import Settings from './Settings';
import Outside from "./Outside";
import NavControl from "./NavControl";
import EpicControl from "./EpicControl";

import dateConverter from '../utils/dateConverter';

const MainMenu = ({ user, setUser, settings, setSettings }) => {
    const { viewWidth } = useAdaptivity();
    const [activeStory, setActiveStory] = useState('tests');
    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
    const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
    const hasHeader = settings.platform !== VKCOM;
  
    // Main states
    const [popout, setPopout] = useState(null);
    const [activeModal, setActiveModal] = useState(null);
  
    // TestList information
    const [testList, setTestList] = useState([]);
    const { loading, request, error } = useHttp();
  
    // Current test information
    const [testPanel, setTestPanel] = useState('tests');
    const [currentTest, setCurrentTest] = useState({});
    const [passingObj, setPassingObj] = useState({});
    const [percents, setPercents] = useState([]);
  
    // Current profile panel
    const [profilePanel, setProfilePanel] = useState('profile');
  
    // User information
    const [vk, setVK] = useState(42);
    const [results, setResults] = useState({});
    const [currentResult, setCurrentResult] = useState({});
    
    const setTest = async (id) => {
      try {
        const test = testList.find(test => test.short_name === id);
        if (typeof(test.questions) === 'undefined') {
          // Getting the required test and its current passing
          const data = await request(`/api/tests?test_short_name=${id}&with_questions=1`, 'GET', null, { Authorization: window.location.search });
          const passing = await request(`/api/passings?test_short_name=${id}&status=in_progress&states=accepted`, 'GET', null, { Authorization: window.location.search });
  
          // Transforming arrays by condition
          data[0].questions = data[0].questions.filter(elem => elem.is_available).sort((a, b) => a.position > b.position ? 1 : -1)
          
          const filtered_passing = [];
          if (passing.length !== 0) {
            passing[0].answers.forEach(elem => {
              const question_index = data[0].questions.findIndex(item => item.q_id === elem.q_id);
              if (question_index !== -1) {
                filtered_passing[question_index] = elem;
              }
            });
          }
  
          // Adding received test to testList
          const index = testList.findIndex(test => test.short_name === id)
          setTestList(testList => ([...testList.slice(0, index), data[0], ...testList.slice(index + 1)]));
  
          // Adding a local copy of the current passing
          setPassingObj(passingObj => ({ ...passingObj, [data[0].short_name]: filtered_passing }));
          
          setCurrentTest(data[0]);
  
          // Print received data
          //console.log(data[0]);
        }
        else {
          setCurrentTest(test);
        }
        setTestPanel('current_test');
      }
      catch (e) {
          console.log(e.message);
      }
    };
  
    // Loader functionality
    useEffect(() => {
      loading ? setPopout(<ScreenSpinner/>) : setPopout(null);
    }, [loading])
  
    // Snackbar on http-request error
    useEffect(() => {
      setPopout(
        <Snackbar
          onClose={() => setPopout(null)}
          duration={3000}
          before={
            <Avatar size={30}>
              <Icon16ErrorCircleFill width={22} height={22}/>
            </Avatar>
          }
        >
          Упс, что-то пошло не так :( Попробуйте снова!
        </Snackbar>
      );
    }, [error])
  
    const showNotice = (message) => {
      setPopout(
        <Snackbar
          onClose={() => setPopout(null)}
          duration={3000}
          before={
            <Avatar size={30}>
              <Icon16Hand width={22} height={22}/>
            </Avatar>
          }
        >
          {message}
        </Snackbar>
      );
    };
  
    // Finish the test
    const finishTest = async (id) => {
      try {
        const result = await request(`/api/results/form_result?test_short_name=${id}`, 'GET', null, { Authorization: window.location.search });
        setResults(results => ({ 
          ...results, 
          [id]: { completion_date: result.completion_date, result: result.result  } 
        }));
  
        setCurrentResult({
          short_name: result.test_short_name,
          full_name: testList.find(test => test.short_name === id).full_name,
          completion_date: dateConverter(result.completion_date),
          result: result.result
        })
  
        setProfilePanel('result');
        setActiveStory('profile');
        setTestPanel('tests');
        setPassingObj(passingObj => ({ ...passingObj, [id]: [] }));
        
        //console.log(result);
      }
      catch (e) {
          console.log(e.message);
      }
    };
  
    // Initial (componentDidMount)
    useEffect(() => {
      (async () => {
        try {
          // Geting information about the user from the DB
          const _user = await request(`/api/users`, 'GET', null, { Authorization: window.location.search });
          if (typeof(_user.error) !== 'undefined') {
            setActiveStory('outside');
          }
          const _settings = _user.params;
          delete _user.params;
          setSettings(settings => ({ ...settings, ..._settings }));
          setUser(user => ({ ...user, ..._user }));
  
  
          // Getting a list of available tests
          const data = await request('/api/tests?with_percent=1', 'GET', null, { Authorization: window.location.search });
          data.sort((a, b) => a.options.position > b.options.position ? 1 : -1)
  
          // Getting the results of its passings
          const last_results = await request(`/api/results?is_processed=1`, 'GET', null, { Authorization: window.location.search });
          last_results.map(item => 
            setResults(results => ({
              ...results, 
              [item.test_short_name]: { 
                completion_date: item.completion_date, 
                result: item.result  
              }})
            )           
          );

          // Test completion percentages
          data.forEach(test => {
            setPercents(percents => ({ 
              ...percents, 
              [test.short_name]: last_results.findIndex(item => item.test_short_name === test.short_name) !== -1 
              && !test.add.aq_count 
                ? { aq_count: test.add.q_count, q_count: test.add.q_count } 
                : test.add
            }));
          });
  
          setTestList(data);
        }
        catch (e) {
          console.log(e.message);
        }
    })()
    }, [])
  
    const modal = (
      <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
        <Instruction
          id='instruction'
          platform={settings.platform}
          setActiveModal={setActiveModal}
          currentTest={currentTest}
        />
      </ModalRoot>
    );
  
    return (
      <SplitLayout
        header={hasHeader && <PanelHeader separator={false} />}
        style={{ justifyContent: "center" }}
        popout={popout}
        modal={modal}
      >
        <SplitCol
          animate={!isDesktop}
          spaced={isDesktop}
          width={isDesktop ? '690px' : '100%'}
          maxWidth={isDesktop ? '690px' : '100%'}
        >
          {isDesktop && typeof(user.error) === 'undefined' 
            && testPanel === 'tests' && profilePanel === 'profile' && (
            <NavControl 
              activeStory={activeStory}
              setActiveStory={setActiveStory}
            />
          )}
          <Epic activeStory={activeStory} tabbar={!isDesktop && typeof(user.error) === 'undefined'  &&
            <EpicControl
                onStoryChange={onStoryChange}
                activeStory={activeStory}
            />
          }>
            <Tests
                id='tests'
                testPanel={testPanel}
                setTestPanel={setTestPanel}
                activeModal={activeModal}
                setActiveModal={setActiveModal}
                passingObj={passingObj}
                setPassingObj={setPassingObj}
                testList={testList}
                setTest={setTest}
                currentTest={currentTest}
                request={request}
                loading={loading}
                error={error}
                viewWidth={viewWidth}
                vk={vk}
                showNotice={showNotice}
                finishTest={finishTest}
                results={results}
                isDesktop={isDesktop}

                settings={settings}
                setSettings={setSettings}

                percents={percents}
                setPercents={setPercents}
            />
            <Profile 
              id='profile'
              user={user}
              profilePanel={profilePanel}
              setProfilePanel={setProfilePanel}
              results={results}
              testList={testList}
              currentResult={currentResult}
              setCurrentResult={setCurrentResult}
            />
            <Settings 
              id='settings'
              settings={settings}
              setSettings={setSettings}
              request={request}
              setActiveModal={setActiveModal}
            />
            <Outside id='outside'/>
          </Epic>
        </SplitCol>
      </SplitLayout>
    );
  };

export default MainMenu;