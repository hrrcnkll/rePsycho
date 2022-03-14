import React from 'react';

import { 
    Div,
    Button,
    Cell,
    List,
    Spacing,
    CellButton
} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import { Icon24Forward } from '@vkontakte/icons';

const Friends = ({answers, callProtocol, currentAnswer, setCurrentAnswer}) => {

    const removeFromList = (index, list, updateListFn) => {
        const _list = [...list];
        _list.splice(index, 1);
        updateListFn(_list.map((item, index) => ({ ...item, position: index })));
    };
      
    const reorderList = ({ from, to }, list, updateListFn) => {
        const _list = [...list];
        _list.splice(from, 1);
        _list.splice(to, 0, list[from]);
        updateListFn(_list.map((item, index) => ({ ...item, position: index })));
    };

    const addFriend = () => {
        bridge
			.send("VKWebAppGetFriends", { multi: false })
			.then(data => {
                if (typeof(data.users[0]) !== 'undefined') {
                    const { first_name, id, last_name, } = data.users[0];
                
                    if (currentAnswer.findIndex(item => item.friend_id === id) === -1) {
                        setCurrentAnswer(currentAnswer => ([
                            ...currentAnswer,
                            {
                                friend_full_name: `${first_name} ${last_name}`,
                                friend_id: id,
                                position: currentAnswer.length
                            }
                        ]));
                    }
                }
			})
			.catch(error => {
				console.log(error);
			})
    };

    return (
        <Div>
            <Button
                mode='secondary'
                stretched
                size='l'
                onClick={() => addFriend()}
            >
                {answers[0].content}
            </Button>
            <Spacing/>
            <List>
            {currentAnswer.map((item, index) => (
                <Cell
                    key={index}
                    mode="removable"
                    draggable
                    onRemove={() =>
                        removeFromList(index, currentAnswer, setCurrentAnswer)
                    }
                    onDragFinish={({ from, to }) =>
                        reorderList({ from, to }, currentAnswer, setCurrentAnswer)
                    }
                >
                    {item.friend_full_name}
                </Cell>
            ))}
            </List>
            {typeof(answers[1]) !== 'undefined' &&
            <>
            <Spacing/>
            <CellButton 
                centered 
                before={<Icon24Forward />}
                onClick={() => callProtocol([{ content: answers[1].content }], false)}
            >
                {answers[1].content}
            </CellButton>
            </>
            }
        </Div>
    )
};

export default Friends;