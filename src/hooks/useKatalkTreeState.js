import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import constants from 'config/constants'
import {
    setKatalkTopFolderAction,
    setSelectedNodeIdAction,
    addKatalkRoomAction,
    addKatalkMessageAction,
    clearKatalkMessageAction,
} from 'slices/katalkTreeSlice';

const {KATALK_TOP_FOLDER_NAME} = constants;

export default function useKatalkTreeState() {
    const dispatch = useDispatch();
    const katalkTopFolder = useSelector(state => state.katalkTree.katalkTopFolder);
    const katalkRooms = useSelector(state => state.katalkTree.katalkRooms);
    const katalkMessages = useSelector(state => state.katalkTree.katalkMessages);
    const selectedNodeId = useSelector(state => state.katalkTree.selectedNodeId);
    const selectedRoomName = katalkRooms.find(katalkRoom => katalkRoom.nodeId === selectedNodeId)?.roomName;
    const messagesOfSelectedRoom = katalkMessages[selectedRoomName];
    const orderedKatalkRooms = React.useMemo(() => [...katalkRooms], [katalkRooms]);
    // const orderedKatalkRooms = [...katalkRooms]
    orderedKatalkRooms.sort((a, b) => b.lastUpdatedTimestamp - a.lastUpdatedTimestamp);

    const initializeTopFolder = React.useCallback(() => {
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

    const clearKatalkMessages = React.useCallback(roomName => {
        dispatch(clearKatalkMessageAction({roomName}))
    },[dispatch])

    const setSelecteNodeId = React.useCallback(nodeId => {
        dispatch(setSelectedNodeIdAction({nodeId}));
    },[dispatch])

    return {
        katalkTopFolder,
        katalkRooms,
        katalkMessages,
        selectedNodeId,
        selectedRoomName,
        messagesOfSelectedRoom,
        orderedKatalkRooms,
        initializeTopFolder,
        addKatalkRoom,
        addKatalkMessages,
        clearKatalkMessages,
        setSelecteNodeId
    }
}