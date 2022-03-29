import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import constants from 'config/constants'
import {
    setKatalkTopFolderAction,
    addKatalkRoomAction,
    addKatalkMessageAction 
} from 'slices/katalkTreeSlice';

const {KATALK_TOP_FOLDER_NAME} = constants;

export default function useKatalTreeState() {
    const dispatch = useDispatch();
    const katalkTopFolder = useSelector(state => state.katalkTree.katalkTopFolder);
    const katalkRooms = useSelector(state => state.katalkTree.katalkRooms);
    const katalkMessages = useSelector(state => state.katalkTree.katalkMessages);

    React.useEffect(() => {
        dispatch(setKatalkTopFolderAction({name: KATALK_TOP_FOLDER_NAME}));
    },[])

    const addKatalkRoom = React.useCallback(roomName => {
        if(katalkRooms.some(room => room.roomName === roomName)) return;
        dispatch(addKatalkRoomAction({roomName}));
    },[dispatch, katalkRooms])

    const addKatalkMessages = React.useCallback((roomName, messages) => {
        messages.forEach(message => {
            dispatch(addKatalkMessageAction({roomName, message}));
        })
    },[dispatch])

    return {
        katalkTopFolder,
        katalkRooms,
        katalkMessages,
        addKatalkRoom,
        addKatalkMessages
    }
}