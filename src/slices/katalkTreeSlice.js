import {createSlice} from "@reduxjs/toolkit";
import {genSequence} from 'lib/util'

const initialState = {
    katalkTopFolder: {},
    katalkRooms: [],
    katalkMessages: {},
    selectedNodeId: null
}

const sequence = genSequence();
const getNextId = () => {
    return sequence.next().value.toString();
}

export const katalkTreeSlice = createSlice({
    name: 'katalkTree',
    initialState,
    reducers: {
        setKatalkTopFolderAction: (state, action) => {
            const {payload} = action;
            const {name} = payload
            state.katalkTopFolder = {nodeId:"0", name};
        },
        addKatalkRoomAction: (state, action) => {
            const {payload} = action;
            const {roomName} = payload;
            const lastUpdatedTimestamp = Date.now();
            state.katalkRooms.push({nodeId: getNextId(), roomName, lastUpdatedTimestamp});
        },
        addKatalkMessageAction: (state, action) => {
            const {payload} = action;
            const {roomName, message} = payload;
            if(state.katalkMessages[roomName] !== undefined){
                state.katalkMessages[roomName].push(message)
            } else {
                state.katalkMessages[roomName] = [message]
            }
            const katalkRoom = state.katalkRooms.find(katalkRoom => katalkRoom.roomName === roomName)
            katalkRoom.lastUpdatedTimestamp = Date.now();
        },
        setSelectedNodeIdAction: (state, action) => {
            const {payload} = action;
            const {nodeId} = payload;
            state.selectedNodeId = nodeId;
        }
    }
})

export const {
    setKatalkTopFolderAction,
    setSelectedNodeIdAction,
    addKatalkRoomAction,
    addKatalkMessageAction
} = katalkTreeSlice.actions;

export default katalkTreeSlice.reducer;