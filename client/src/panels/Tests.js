import React from "react";
import {
  View,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  PanelHeaderBack,
  PanelHeaderContent,
  IconButton
} from "@vkontakte/vkui";

import { Icon28QuestionOutline, Icon28SearchOutline } from "@vkontakte/icons";

import TestList from "./test/TestList";
import TestLogic from "./test/TestLogic";

const Tests = (props) => {

  return (
    <View activePanel={props.testPanel}>
        <Panel id="tests">
        <PanelHeader>
            Тесты
        </PanelHeader>
        <TestList 
            testList={props.testList}
            setTestList={props.setTestList}
            loading={props.loading}
            request={props.request}
            error={props.error}
            viewWidth={props.viewWidth}
            scheme={props.settings.scheme}
            setTest={props.setTest}
            percents={props.percents}
            setPercents={props.setPercents}
            defaultImgs={props.settings.defaultImgs}
        />
        </Panel>

        <Panel id="current_test">
        {Object.keys(props.currentTest).length !== 0 &&
        <>
            <PanelHeader left={<PanelHeaderBack onClick={() => props.setTestPanel("tests")}/>}>
            <PanelHeaderContent 
                before={<IconButton onClick={() => props.setActiveModal("instruction")}><Icon28SearchOutline/></IconButton>}
            >
                {props.currentTest.full_name}
            </PanelHeaderContent>
            </PanelHeader>
            <TestLogic 
                test={props.currentTest}
                passingObj={props.passingObj}
                setPassingObj={props.setPassingObj}
                activeModal={props.activeModal}
                setActiveModal={props.setActiveModal}
                vk={props.vk}
                request={props.request}
                showNotice={props.showNotice}
                finishTest={props.finishTest}
                isDesktop={props.isDesktop}
                settings={props.settings}
                results={props.results}
                percents={props.percents}
                setPercents={props.setPercents}
            />
        </>
        }
        </Panel>
    </View>
  );
}

export default Tests;