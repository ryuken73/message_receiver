import {createSlice} from "@reduxjs/toolkit";
import {genSequence} from 'lib/util'

const initialState = {
    katalkTopFolder: {},
    katalkRooms: [],
    katalkMessages: {}
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
            state.katalkTopFolder = {nodeId: getNextId(), name};
        },
        addKatalkRoomAction: (state, action) => {
            const {payload} = action;
            const {roomName} = payload
            state.katalkRooms.push({nodeId: getNextId(), roomName});
        },
        addKatalkMessageAction: (state, action) => {
            const {payload} = action;
            const {roomName, message} = payload;
            if(state.katalkMessages[roomName] !== undefined){
                state.katalkMessages[roomName].push(message)
            } else {
                state.katalkMessages[roomName] = [message]
            }
            // const roomMessages = state.katalkMessages[roomName] || [];
            // roomMessages.push(message)
            // state.katalkMessages[roomName] = roomMessages;
        }
    }
})

export const {
    setKatalkTopFolderAction,
    addKatalkRoomAction,
    addKatalkMessageAction
} = katalkTreeSlice.actions;

export default katalkTreeSlice.reducer;