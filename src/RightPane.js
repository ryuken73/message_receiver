import React from 'react'
import styled from '@emotion/styled';
import useKatalkTreeState from 'hooks/useKatalkTreeState';

const RightContainer = styled.div`
    height: 100%;
    background: darkslategrey;
    text-align: left;
    padding: 10px;
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
                <div>{message}</div>
            ))}
        </RightContainer>
    )
}

export default React.memo(RightPane)
