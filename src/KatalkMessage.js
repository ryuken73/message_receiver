import React from 'react';
import styled from 'styled-components';
import constants from 'config/constants';
import { loadingButtonClasses } from '@mui/lab';

const {KATALK_MESSAGE_REGEXP} = constants;
const {REGEXP_DATE, REGEXP_MESSAGE} = KATALK_MESSAGE_REGEXP;

const isDate = message => REGEXP_DATE.test(message);
const isMessage = message => REGEXP_MESSAGE.test(message);

const MessageContainer = styled.div``
const DateMessage = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 18px;
    color: yellow;
    opacity: 0.8;
`
const Title = styled.div`
    font-size: 12px;
    color: lightgrey;
    margin-left: 10px;
    margin-top: 5px;
`
const Message = styled.div`
    white-space: pre-line;
    margin-left: 60px;
`

const splitMessage = message => {
    if(isDate(message)) {
        return [];
    } 
    const [result]  = [...message.matchAll(REGEXP_MESSAGE)]; 
    const [originalMessage, whoStr, timeStr, restStr] = result;
    return [whoStr, timeStr, restStr]
}

const KatalkMessage = props => {
    const {message} = props;
    const isDateMessage = isDate(message);
    const [whoStr, timeStr, restStr] = splitMessage(message);
    return (
        <MessageContainer>
            {isDateMessage ? (
                <DateMessage>{message}</DateMessage>
            ):(
                <React.Fragment>
                    <Title>{whoStr}{timeStr}</Title>
                    <Message>{restStr}</Message>
                </React.Fragment>
            )}
        </MessageContainer>
    )
}

export default React.memo(KatalkMessage)
