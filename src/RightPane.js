import React from 'react'
import styled from '@emotion/styled';
import KatalkMessage from 'KatalkMessage';
import useKatalkTreeState from 'hooks/useKatalkTreeState';

const RightContainer = styled.div`
    box-sizing: border-box;
    height: 100%;
    background: #280808;
    text-align: left;
    padding: 20px;
    font-size: 15px;
    overflow-x: auto;
`
function RightPane() {
    const {
        messagesOfSelectedRoom=[]
    } = useKatalkTreeState();
    const messageEndRef = React.useRef(null);
    const scrollToBottom = React.useCallback(()=>{
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    },[messageEndRef])
    React.useEffect(() => {
        scrollToBottom()
    },[messagesOfSelectedRoom, scrollToBottom])
    return (
        <RightContainer>
            {messagesOfSelectedRoom.map(message => (
                <KatalkMessage message={message}></KatalkMessage>
            ))}
            <div ref={messageEndRef}></div>
        </RightContainer>
    )
}

export default React.memo(RightPane)
