import React from 'react';
import {
    View,
    Panel,
    PanelHeader,
    Group,
    RichCell,
    Avatar
} from '@vkontakte/vkui';

import FullResult from "./profile/FullResult";
import ResultList from './profile/ResultList';

import dateConverter from '../utils/dateConverter';

const Profile = ({ results, testList, user, profilePanel, setProfilePanel, currentResult, setCurrentResult }) => {

    const date = dateConverter(user.created_at);

    return (
        <View activePanel={profilePanel}>
            <Panel id='profile'>
                <PanelHeader>Профиль</PanelHeader>
                <Group>
                    <RichCell
                        disabled
                        before={<Avatar size={72} src={user.photo_max_orig} />}
                        caption={`В приложении с ${date.DMY}`}
                    >
                        {user.first_name}&nbsp;{user.last_name}
                    </RichCell>
                </Group>
                
                <ResultList
                    results={results}
                    testList={testList}
                    setProfilePanel={setProfilePanel}
                    setCurrentResult={setCurrentResult}
                />
            </Panel>
            <FullResult
                id="result"
                setProfilePanel={setProfilePanel}
                currentResult={currentResult}
            />
        </View>
    )
};

export default Profile;