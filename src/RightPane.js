import React from 'react'
import styled from '@emotion/styled';
import KatalkMessage from 'KatalkMessage';
import useKatalkTreeState from 'hooks/useKatalkTreeState';

const RightContainer = styled.div`
    box-sizing: border-box;
    height: 100%;
    background: darkslategrey;
    text-align: left;
    padding: 20px;
    font-size: 15px;
    overflow-x: auto;
`
function RightPane() {
    const {
        messagesOfSelectedRoom=[]
    } = useKatalkTreeState();

    return (
        <RightContainer>
            {messagesOfSelectedRoom.map(message => (
                <KatalkMessage message={message}></KatalkMessage>
            ))}
        </RightContainer>
    )
}

export default React.memo(RightPane)
